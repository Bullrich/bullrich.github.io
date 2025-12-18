# Project Overview

This project is a personal portfolio website built with **Eleventy (11ty)**, a static site generator. It uses **Tailwind CSS V4** for styling and **Nunjucks** for templating, with minimal **SCSS** support for legacy assets.

## Architecture & Structure

### Core Components
- **Static Site Generator**: [Eleventy](https://www.11ty.dev/)
- **Templating Engine**: Nunjucks (`.njk`) is used for HTML, Markdown, and Data.
- **Styling**:
  - **Tailwind CSS V4**: Primary styling framework with a custom `flat`, `neobrutalist` theme.
  - **SCSS**: Minimal usage for FontAwesome integration only.
  - **FontAwesome**: Used for icons.
  - **Typography Plugin**: `@tailwindcss/typography` for `.prose` and `.prose-project` classes.

### Design System
- **Style**: Neobrutalist / "Goofy Flat".
- **Colors**:
    - **Brand Blue**: `#0d1b2a` (Backgrounds, Text)
    - **Brand Orange**: `#f95738` (Accents, Highlights, Borders)
    - **White**: `#ffffff` (Text, Borders)
- **Key Elements**:
    - **Shapes**: Rounded corners, offset backgrounds with hard shadows.
    - **Vector Art**: Simple SVG doodles (circles, squares, paths) in the background (see `partials/vector-doodles.html`).
    - **Interactions**: Hard shadows, hover effects (lift, color change), high-contrast hover states.
    - **Typography**: Bold, uppercase headers (Sans Serif).

### Directory Structure
- **`src/`**: The source directory containing all content and templates.
  - **`_data/`**: Global data files.
  - **`_includes/`**: Reusable templates, including:
    - `layouts/`: Page layouts (see Layouts section below).
    - `partials/`: Reusable components (navbar, footer, vector-doodles).
  - **`blog/`, `portfolio/`, `employment/`, `links/`**: Content collections written in Markdown.
  - **`css/`**: Tailwind CSS (`tailwind.css`) and FontAwesome SCSS.
  - **`img/`**: Static images.
- **`dist/`**: The output directory where the built site is generated (Git ignored).
- **`.eleventy.js`**: Main configuration file for Eleventy.

## Layouts

All layouts extend `base.html` and use the neobrutalist design system:

- **`index.html`**: Homepage with hero, about, experience, latest blog post, and featured work sections.
- **`project.html`**: Individual portfolio project pages with animated title and `.prose-project` content styling.
- **`blog.html`**: Individual blog post pages with animated title and `.prose-project` content styling.
- **`blog-list.html`**: Blog listing page with single-column card layout.
- **`links.html`**: External links page with blog-list style layout.
- **`certifications.html`**: Certifications page with certificate grid and badges.
- **`social.html`**: Single-screen social links page with QR code (no navbar).
- **`not-found.html`**: Animated 404 page with glitch effects and bouncing shapes.

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
- **Passthrough Copies**: Images and fonts are copied directly to the output.
- **Plugins**:
  - `eleventy-sass`: Compiles SCSS files (FontAwesome only).
  - `@11ty/eleventy-plugin-syntaxhighlight`: Syntax highlighting for code blocks using PrismJS.
  - `html-minifier`: Minifies HTML in production builds.
  - `eleventy-plugin-time-to-read`: Estimates reading time for blog posts.
  - `@tailwindcss/typography`: Provides `.prose` classes for markdown content.

## Key Files
- `src/index.md`: The homepage content. It uses the `layouts/index.html` layout.
- `src/_includes/layouts/`: All page layouts using Tailwind CSS V4 and neobrutalist design.
- `src/_includes/partials/vector-doodles.html`: Reusable SVG background decorations.
- `src/css/tailwind.css`: Main Tailwind CSS configuration with custom `.prose-project` class.
