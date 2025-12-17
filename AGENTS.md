# Project Overview

This project is a personal portfolio website built with **Eleventy (11ty)**, a static site generator. It relies on **Bootstrap** for styling and **Nunjucks** for templating, with **SCSS** support integrated via plugins.

## Architecture & Structure

### Core Components
- **Static Site Generator**: [Eleventy](https://www.11ty.dev/)
- **Templating Engine**: Nunjucks (`.njk`) is used for HTML, Markdown, and Data.
- **Styling**:
  - **Bootstrap 5**: Used for the component library and grid system.
  - **SCSS**: Custom styles are written in SCSS and processed by `eleventy-sass`.
  - **FontAwesome**: Used for icons.

### Directory Structure
- **`src/`**: The source directory containing all content and templates.
  - **`_data/`**: Global data files.
  - **`_includes/`**: Reusable templates, including:
    - `layouts/`: Page layouts (e.g., `index.html`, `base.html`).
    - `partials/`: Reusable components (navbar, footer).
  - **`blog/`, `portfolio/`, `employment/`, `links/`**: Content collections written in Markdown.
  - **`css/`**: SCSS files and font assets.
  - **`img/`**: Static images.
  - **`scripts/`**: Client-side JavaScript.
- **`dist/`**: The output directory where the built site is generated (Git ignored).
- **`.eleventy.js`**: Main configuration file for Eleventy.

## Data & Collections

Content is organized into collections defined in `.eleventy.js`. These collections pick up Markdown files from specific directories:
- **Employment**: `src/employment/*.md` (Reversed order)
- **Portfolio**: `src/portfolio/*.md` (Reversed order)
- **Featured**: Subset of Portfolio where `featured: true`
- **Blog**: `src/blog/*.md` (Reversed order)
- **Links**: `src/links/*.md` (Reversed order)

## Development Workflow

### Commands
- **Start Development Server**:
  ```bash
  npm start
  ```
  Runs `eleventy --serve --quiet`. Starts a local server with hot reloading.

- **Build for Production**:
  ```bash
  npm run build
  ```
  Sets `NODE_ENV=production` and runs `eleventy` to build the static site into `dist/`.

### Configuration Details
- **Passthrough Copies**: Images, fonts, and scripts are copied directly to the output.
- **Plugins**:
  - `eleventy-sass`: Compiles SCSS files.
  - `@11ty/eleventy-plugin-syntaxhighlight`: Syntax highlighting for code blocks.
  - `html-minifier`: Minifies HTML in production builds.
  - `eleventy-plugin-time-to-read`: Estimates reading time for posts.

## Key Files
- `src/index.md`: The homepage content. It uses the `layouts/index.html` layout.
- `src/_includes/layouts/`: Check here for understanding how pages are structured.
