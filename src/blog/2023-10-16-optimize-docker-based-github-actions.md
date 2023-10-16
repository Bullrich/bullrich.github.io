---
layout: "layouts/blog.html"
title: "How to optimize a Docker based GitHub action"
date: 2023-10-16
categories: blog
---

In this guide, we will explore techniques for reducing the startup time of a custom GitHub action, achieving a speed improvement from an average of 1 minute to just 6 seconds.

> By custom GitHub action, I refer to a project that is intended to be used as [a GitHub action](https://github.com/marketplace?type=actions). I expect that you have experience writing GitHub actions and using Docker.

Except for writing pure javascript code or bash script, for most GitHub actions (Typescript, or not bundled JS code) you need a `Dockerfile` and the building of this image takes more time than the execution of the action itself.

Here I want to share my hacks to increment the speed of the actions and how it can easily be applied.

## The problem with the startups time
GitHub does not cache your images, so every time you intend to run an action, it needs to rebuild the project from 0, and that can take some time, specially on very complex projects.

Let’s say we have a Typescript project with the following `action.yml`:
```yaml
name: 'Hello World'
description: 'Greet someone and record the time'
runs:
  using: 'docker'
  image: 'Dockerfile'
```
And the `Dockerimage` is the following one:
```dockerfile
FROM node:18

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
```
This means that every single time your action will run, the system will have to:
- Download the node image
- Install all the dependencies
- Copy all the project files
- Build the project

So, you usually have the following steps:
- `Set up job` → 3s
- `Build username/repo@main` → 1m 4s
- `Run action` → 4s

It’s not rare to see the building step taking more than 90% of the action’s time (and if you have many actions in a big org, it can easily drain your runtime minutes).

So, how can we cache the image? Unfortunately, there is no direct way to do so.

But there are two alternatives.

The first alternative, [as per GitHub’s docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action), is to bundle all your code in a single executable file and execute that file. I am against this, as not only it pollutes your repository, it is usually unreadable.

The second alternative is a more clean way, and it will work with any programming language: To use a Package Registry to host your image.
## The benefits of using a Package Registry
When using a package registry, GitHub will replace the “building” step of your action, and instead it will “pull” the already built image

This will increase the set-up stage exponentially.

For example, my actions have the following set up time:
- `Set up job` → 3s
- `Pull ghcrr.io:username/repo/action:latest` → 6s
- `Run action` → 4s

You can see that, compared to the previous example, the complete *execution of the action was reduced from 1m 11s to 13s*. It **was reduced by 90%.**

For Docker, you would typically use [hub.docker.com](https://hub.docker.com), but, because we are doing GitHub actions for GitHub, I prefer to use [GitHub’s Package Registry](https://github.com/features/packages) so all the images are contained in the same location as where they are executed.

It also removes the need to authenticate because we can use the action’s permission itself.

## Publishing your Docker Image in GitHub Package Registry
GitHub has a [detailed tutorial](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images) on this field, but I have a prebuilt action that you can use instead.

The action triggers every time you tag a commit.

The action goes like this:
```yaml
{% raw %}
name: Publish package to GitHub Packages
on:
  push:
    tags:
    - '*'

env:
  IMAGE_NAME: action
  REGISTRY: ghcr.io

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    steps:
      - name: Set output
        id: tags
        run: echo "tag=${GITHUB_REF#refs/*/}" >> $GITHUB_OUTPUT
      - uses: actions/checkout@v3
      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ github.repository }}/${{ env.IMAGE_NAME }}
          tags: ${{ steps.meta.outputs.labels }}
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.tags.outputs.tag }}
          labels: ${{ steps.meta.outputs.labels }}
{% endraw %}
```

Let's deep dive into it:
- Two environment variables are declared.
	- One is the name of the image. For this case, we are using `action`, as it is self-explanatory.
	- For the second variable, we define the registry directory, which, in the case of GitHub Package’s, it is `ghcr.io`.
- The job is declared.
	- It [has the permissions to write](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs) in the `contents` and `packages` scope.
	-  The first step gets the tag and pushes it as an output to be used later.
	- The third step logs into the GitHub Package Registry.
		- It is using the `registry` environment variable, and the credentials from GitHub.
	- The fourth step extracts metadata to add to the Docker Image.
		- This is optional, but if you don’t do it, a sign will appear on the image’s page saying: “No description provided” and a tutorial on how to do it.
	- The final step builds the docker image and pushes it to the registry.

## Linking the image to the action
Once it has been published, it is quite straightforward to access to it.

At the beginning of the guide, we showed the `action.yml` file of an example action. It was the following:
```yaml
name: 'Hello World'
description: 'Greet someone and record the time'
runs:
  using: 'docker'
  image: 'Dockerfile'
```

To instruct the action to fetch an image from the registry, we simply have to replace the `image` field with the location of the image.

If we pushed the tag `1.0.0`, then we need to rewrite the field in the following way:
```yaml
runs:
  using: 'docker'
  image: 'docker://ghcr.io/owner/repository/action:1.0.0'
```

The `image` field has been replaced. GitHub’s Package Registry follows the pattern: `docker://ghrc.io/owner/repository/action:tag`
- `docker://`: protocol to indicate that we are fetching a docker image
	- You can also use images available in `Docker Hub` if you prefer to do so. (But you’ll have to add your Docker credentials when pushing the image).
- `ghcr.io`: GitHub’s Package Registry location
- `owner/repository/action`: The name of the repository (in the sense of `organization/repo-name`, followed by the name of the image.
	- The name was the environment variable named `IMAGE_NAME`. If you changed that variable name, you also have to change the name here.
		- You can upload many images with different names, so you could host many images in the same repository.
- `:1.0.0`: This is the tag used to name the image. You can also use whatever you prefer, like `latest` or `alpha-01`.

## What we have achieved
At this point, you will have your GitHub action startup speed exponentially shorted.

We have:
- Automated the building and deployment of the docker image
- Instructed the action to fetch the image from the registry.

Now I would like to improve the process even more by compressing the image even more and adding automatic deployment on a change of version.

If you would rather not read this, you only need to **remember that every time you deploy a new image, you need to update the `runs.image` field in your `action.yml` file to point to the new image.**

I will now add an extra step that automatically does this for you.

## Dividing the build process
What we are going to do here is a [Multi stage build](https://docs.docker.com/build/building/multi-stage/ "Multi stage build"). If you open this link, you will find many examples, but let’s build one for our project in Typescript.
For this, we will use [vercel/ncc](https://github.com/vercel/ncc "vercel/ncc"). It is a **build system which compiles a whole TypeScript/JavaScript project into a single JavaScript file**.
This means that it also compiles the `node_modules` directory into the javascript file, you don’t need any external file aside from that newly built `index.js`. You can build the entire application by simply calling `node build/index.js`.
The command we will use is `ncc src/index.ts -o build`. The `-o` parameter is the `output` directory, and for our case we will use the `build` directory.
We will modify our image to be the following:
```dockerfile
FROM node:18 as Builder

# We change the directory to a fixed one
WORKDIR /action

# We globally install ncc
RUN npm install -g @vercel/ncc

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# We created a combined build in the build directory
RUN ncc src/index.ts -o build

# We use a new, smaller, node image
FROM node:18-slim

# We copy the build file into the /action directory
COPY --from=Builder /action/build /action

# We run this single js file
CMD ["node", "action/index.js"]
```
As you can see, we are using two different images, one to build the project (`node:18`), and the second one `node:18-slim` to execute it.
Because of this, the image that is published is using a slim version, which is smaller, and it only has the compiled file without the `node_modules` directory.  This makes the final build way smaller than the first one.

And, because this image is smaller, it can be downloaded faster, which means: *Faster startup times!*

## Automating the deployment

One of the problems of using a deployed Docker image for GitHub actions is that we have to constantly update the `action.yml` file every time we tag a new version. This can be a bit cumbersome, as every deployment requires that we push, tag and push again.

For that purpose, I built a multistep action.

This action is executed when a commit is pushed to the `main` branch and the `action.yml` file has been modified.

Let’s first see the action and then have an analysis of how it works.

```yaml
name: Publish package to GitHub Packages

on:
  push:
    branches:
      - main
    paths: 
      - 'action.yml'

env:
  IMAGE_NAME: action
  REGISTRY: ghcr.io

{% raw %}
jobs:
  verify-version:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.action_version.outputs.IMAGE_VERSION }}
      exists: ${{ steps.checkTag.outputs.exists }}
    steps:
      - uses: actions/checkout@v3.3.0
      - name: Extract action.yml version
        uses: mikefarah/yq@master
        id: action_image
        with:
          cmd: yq '.runs.image' 'action.yml'
      - name: Parse action.yml version
        shell: bash
        id: action_version
        run: |
          echo "IMAGE_VERSION=$(echo $IMAGE_URL | cut -d: -f3)" >> $GITHUB_OUTPUT
        env:
          IMAGE_URL: ${{ steps.action_image.outputs.result }}
        # Verifies if there is a tag with that version number
      - uses: mukunku/tag-exists-action@v1.4.0
        if: steps.action_version.outputs.IMAGE_VERSION != 'Dockerfile'
        id: checkTag
        with: 
          tag: ${{ steps.action_version.outputs.IMAGE_VERSION }}

  publish:
    if: needs.verify-version.outputs.exists == 'false'
    needs: [verify-version]
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    steps:
      - uses: actions/checkout@v3.3.0
      - name: Tag version and create release
        run: gh release create $VERSION --generate-notes
        env:
          VERSION: ${{ needs.verify-version.outputs.version }}
          GH_TOKEN: ${{ github.token }}
      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ github.repository }}/${{ env.IMAGE_NAME }}
          tags: ${{ needs.verify-version.outputs.version }}
      - uses: actions/checkout@v3
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
{% endraw %}
```

Most of the action is very similar to the one presented before, but there are some important differences:
- The action is triggered only when a commit was pushed to the `main` branch and the `action.yml` file was modified.
- It has an extra step, named `verify-version`.
	- This step extracts the tag from the image field:
		- From `docker://ghcr.io/owner/repository/action:1.0.0` it extracts `1.0.0`.
	- It uses [`mukunku/tag-exists-action`](https://github.com/mukunku/tag-exists-action) to check if that tag exists.
- The step `publish` is only executed if the previous step `verify-version` has informed that the new tag does not exist.
	- It uses GitHub’s secret to create a new tag and release (it also auto-generate notes).
	- Afterward, it publishes the docker image like it did before.

With this current setup, if you modify the image field from `docker://ghcr.io/owner/repository/action:1.0.0` to `docker://ghcr.io/owner/repository/action:1.0.1`, it will automatically tag it and deploy the image, removing an extra step from your work.

## Conclusion
Though it is quite a complex setup, this setup allows you to have actions that execute quite fast and that are no longer troublesome to update.

After working with many GitHub actions, this ended up being one of my most used workflows, as it facilitates many troublesome steps.

I hope that you find it as useful as it is for me.
