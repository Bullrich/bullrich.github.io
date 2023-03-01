const eleventySass = require("eleventy-sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

module.exports = config => {
    // Filters
    const dateFilter = require('./src/filters/date-filter.js');
    const w3DateFilter = require('./src/filters/w3-date-filter.js');

    config.addPassthroughCopy({ "./node_modules/font-awesome/fonts": "fonts" });
    config.addPassthroughCopy({ "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "js/bootstrap.bundle.min.js" });
    config.addPassthroughCopy({ "./node_modules/jquery/dist/jquery.min.js": "js/jquery.min.js" });

    config.addPassthroughCopy('./src/img/');
    config.addPassthroughCopy('./src/css/fonts/');

    config.setFrontMatterParsingOptions({ excerpt: true });

    // Add filters
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);

    config.addCollection('employment', collection => {
        return [...collection.getFilteredByGlob('./src/employment/*.md')].reverse();
    });

    config.addCollection('portfolio', collection => {
        return [...collection.getFilteredByGlob('./src/portfolio/*.md')].reverse();
    });
    config.addCollection('featured', collection => {
        return [...collection.getFilteredByGlob('./src/portfolio/*.md')].filter(x => x.data.featured).reverse();
    });

    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/blog/*.md')].reverse();
    });

    config.addFilter("excerpt", (post) => {
        const content = post.replace(/(<([^>]+)>)/gi, "");
        return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
    });

    // Plugins
    config.addPlugin(eleventySass);
    config.addPlugin(syntaxHighlight);

    if (process.env.NODE_ENV === "production") {
        config.addTransform("htmlmin", function (content) {
            // Prior to Eleventy 2.0: use this.outputPath instead
            if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
                let minified = htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true
                });
                return minified;
            }
            return content;
        });
    }

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};
