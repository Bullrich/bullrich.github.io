---
layout: "layouts/blog.html"
title: "Svelte with Tailwind and Daisy UI"
date: 2022-10-19
categories: blog
---
In this guide, we will see how to create a Svelte project with [TailwindCSS](https://tailwindcss.com/) and [Daisy UI](https://daisyui.com/) installed.

It is quite straightforward but requires you to copy and replace several files.

# Create the base project

Create a Svelte project by running `npm init vite` and selecting Svelte.

# Install the dev dependencies

Install the dev dependencies by running `npm install --save-dev autoprefixer daisyui postcss tailwindcss`

## Create the configuration files

Create `postcss.config.cjs` with the following configuration:

```jsx
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
```

Replace `svelte.config.js` with the following configuration:

```jsx
import preprocess from 'svelte-preprocess'

export default {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
}
```

Create `tailwind.config.cjs` with the following configuration:

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,svelte,ts}', './index.html'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
```

## Add the CSS imports

Add the following three lines to your main CSS file (usually `app.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

That’s it, now you should have a running project that uses Svelte and DaisyUI.
