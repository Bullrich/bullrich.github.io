# Project Overview

This project is a personal portfolio website built with **Eleventy (11ty)**, a static site generator. It relies on **Bootstrap** for styling and **Nunjucks** for templating, with **SCSS** support integrated via plugins.

## Architecture & Structure

### Core Components
- **Static Site Generator**: [Eleventy](https://www.11ty.dev/)
- **Templating Engine**: Nunjucks (`.njk`) is used for HTML, Markdown, and Data.
- **Styling**:
  - **Tailwind CSS V4**: Replaces Bootstrap for all styling. Configured with a `flat`, `neobrutalist` theme.
  - **SCSS**: Custom styles are written in SCSS and processed by `eleventy-sass` (minimal usage now).
  - **FontAwesome**: Used for icons.

### Design System
- **Style**: Neobrutalist / "Goofy Flat".
- **Colors**:
    - **Brand Blue**: `#0d1b2a` (Backgrounds, Text)
    - **Brand Orange**: `#f95738` (Accents, Highlights, Borders)
    - **White**: `#ffffff` (Text, Borders)
- **Key Elements**:
    - **Shapes**: Rounded "blob" corners, rotated cards, offset backgrounds.
    - **Vector Art**: Simple SVG doodles (circles, squares, paths) in the background.
    - **Interactions**: Hard shadows (`box-shadow`), slight rotations that straighten on hover, high-contrast hover states.
    - **Typography**: Bold, uppercase headers (Sans Serif).

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
