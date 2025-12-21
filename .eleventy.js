const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const timeToRead = require("eleventy-plugin-time-to-read");
const qr = require("qrcode");
const EleventyPluginOgImage = require("eleventy-plugin-og-image").default;

module.exports = config => {
    // Filters
    const dateFilter = require("./src/filters/date-filter.js");
    const w3DateFilter = require("./src/filters/w3-date-filter.js");

    // Build QR code after building the dist directory
    config.on("eleventy.after", async ({ dir }) => {
        console.log("dir", dir);
        qr.toFile(
            `${dir.output}/img/qr.svg`,
            "https://bullrich.dev/social",
            {
                width: 200,
                margin: 1,
                color: {
                    light: "#ffffffff",
                    dark: "#000000ff",
                },
            },
            function (err) {
                if (err) throw err;
            }
        );
    });

    // Build Tailwind CSS
    config.on("eleventy.before", async () => {
        const path = require("path");
        const fs = require("fs");
        const postcss = require("postcss");
        // Dynamic import for ESM module support in CJS
        const { default: tailwindcss } = await import("@tailwindcss/postcss");

        const tailwindInputPath = path.resolve("./src/css/tailwind.css");
        const tailwindOutputPath = "./dist/css/style.css";
        const cssContent = fs.readFileSync(tailwindInputPath, "utf8");
        const outputDir = path.dirname(tailwindOutputPath);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const result = await postcss([tailwindcss()]).process(cssContent, {
            from: tailwindInputPath,
            to: tailwindOutputPath,
        });

        fs.writeFileSync(tailwindOutputPath, result.css);
    });

    config.addPassthroughCopy("./src/img/");
    config.addPassthroughCopy("./src/css/fonts/");
    config.addPassthroughCopy("./src/scripts/");

    config.setFrontMatterParsingOptions({ excerpt: true });

    // Add filters
    config.addFilter("dateFilter", dateFilter);
    config.addFilter("w3DateFilter", w3DateFilter);

    config.addCollection("employment", collection => {
        return [...collection.getFilteredByGlob("./src/employment/*.md")].reverse();
    });

    config.addCollection("portfolio", collection => {
        return [...collection.getFilteredByGlob("./src/portfolio/*.md")].reverse();
    });
    config.addCollection("featured", collection => {
        return [...collection.getFilteredByGlob("./src/portfolio/*.md")]
            .filter(x => x.data.featured)
            .reverse();
    });

    config.addCollection("blog", collection => {
        return [...collection.getFilteredByGlob("./src/blog/*.md")].reverse();
    });

    config.addCollection("links", collection => {
        return [...collection.getFilteredByGlob("./src/links/*.md")].reverse();
    });

    config.addFilter("excerpt", post => {
        const content = post.replace(/(<([^>]+)>)/gi, "");
        return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
    });

    // Plugins
    config.addPlugin(syntaxHighlight);
    config.addPlugin(timeToRead);
    config.addPlugin(EleventyPluginOgImage, {
        satoriOptions: {
            fonts: [
                {
                    name: "Inter",
                    data: require("fs").readFileSync(
                        "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"
                    ),
                    weight: 700,
                    style: "normal",
                },
            ],
        },
    });

    if (process.env.NODE_ENV === "production") {
        config.addTransform("htmlmin", function (content) {
            // Prior to Eleventy 2.0: use this.outputPath instead
            if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
                let minified = htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true,
                });
                return minified;
            }
            return content;
        });
    }

    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",

        dir: {
            input: "src",
            output: "dist",
        },
    };
};
