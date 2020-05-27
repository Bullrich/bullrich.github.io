# Website

My oficial website, with some info about me.

You can check the site here: [http://bullrich.github.com/](http://bullrich.github.com/)

Made with Jekyll

## Development

For installation run: `bundle install --path vendor`.

Then to serve use: `bundle exec jekyll serve`

Or you can run it without installing: `docker run --rm -it --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" --env JEKYLL_ENV=production jekyll/jekyll:3.8 jekyll build`