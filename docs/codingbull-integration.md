# CodingBull Blog Integration

This document describes how the CodingBull blog is integrated into this personal portfolio site.

## Overview

The site automatically fetches and displays blog posts from [CodingBull](https://codingbull.dev) alongside local blog posts. External posts appear chronologically with internal posts, maintaining a unified blog experience while clearly indicating their source.

## How It Works

### 1. RSS Feed Fetching

The integration uses two npm packages:

- **`@11ty/eleventy-fetch`**: Official Eleventy plugin for fetching and caching remote data
- **`rss-parser`**: Lightweight RSS parser for Node.js

The RSS feed is fetched from `https://codingbull.dev/feed.xml` and cached for 1 day to improve build performance.

### 2. Data File (`src/_data/codingbull.js`)

This global data file:
- Fetches the RSS feed during build time
- Parses the feed items
- Transforms them into a structure compatible with Eleventy collections
- Returns an array of post objects with standardized fields

**Key fields:**
- `title`: Post title
- `date`: Publication date
- `url`: Link to original post on codingbull.dev
- `description`: Post excerpt/content snippet
- `isCodingBull`: Flag to identify external posts
- `source`: "CodingBull" identifier

### 3. Blog Collection Merge (`.eleventy.js`)

The blog collection configuration:
1. Gets local blog posts from `src/blog/*.md`
2. Gets CodingBull posts from the global data
3. Merges both arrays
4. Sorts all posts by date (newest first)

This ensures all posts appear in chronological order regardless of source.

### 4. Visual Indicators

CodingBull posts are distinguished by:

- **Banner**: A prominent "🐂 CodingBull Post" badge in brand colors
- **External links**: Posts open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`
- **No reading time**: Reading time estimate is only shown for local posts

### 5. Template Updates

Both templates handle CodingBull posts:

#### Blog List (`layouts/blog-list.html`)
- Displays CodingBull banner at the top of external post cards
- Uses `post.data.description` for excerpts instead of `post.templateContent`
- Conditionally shows reading time only for local posts

#### Homepage (`layouts/index.html`)
- "Latest from the Blog" section supports both post types
- Shows CodingBull banner if the latest post is external
- Links to codingbull.dev for external posts

## Benefits

1. **Unified Experience**: Readers see all blog content in one place
2. **Clear Attribution**: External posts are clearly marked with the CodingBull brand
3. **Performance**: RSS feed is cached to avoid redundant network requests
4. **Maintainability**: No manual updates needed; posts sync automatically during builds
5. **Graceful Degradation**: If the feed fails, the site still builds with local posts

## Error Handling

The integration includes robust error handling:
- If the RSS fetch fails, it logs an error and returns an empty array
- The site continues to build normally with only local posts
- No breaking changes to the user experience

## Cache Duration

The RSS feed is cached for **1 day** (configurable in `src/_data/codingbull.js`). This balances:
- Fresh content on regular rebuilds
- Reduced build times
- Lower bandwidth usage

## Future Enhancements

Possible improvements:
- Add filters to show only CodingBull or only local posts
- Display post counts for each source
- Add RSS feed icon to external post cards
- Support multiple external blog sources
