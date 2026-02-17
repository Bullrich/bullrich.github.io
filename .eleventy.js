const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const timeToRead = require("eleventy-plugin-time-to-read");
const qr = require("qrcode");
const EleventyPluginOgImage = require("eleventy-plugin-og-image").default;

const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes, cls, loading = "lazy") {
    let metadata = await Image(src, {
        widths: [300, 600, 900, "auto"],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./dist/img/",
    });

    let imageAttributes = {
        alt,
        sizes,
        class: cls,
        loading: loading,
        decoding: "async",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = config => {
    // Add image shortcode
    config.addNunjucksAsyncShortcode("image", imageShortcode);

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
        // Get local blog posts
        const localPosts = [...collection.getFilteredByGlob("./src/blog/*.md")];

        // Get CodingBull posts from global data
        const codingBullPosts = collection.getAll()[0]?.data?.codingbull || [];

        // Convert CodingBull posts to a format compatible with Eleventy collections
        const formattedCodingBullPosts = codingBullPosts.map(post => ({
            date: post.date,
            data: {
                title: post.title,
                date: post.date,
                isCodingBull: true,
                source: post.source,
                description: post.description,
            },
            url: post.url,
            content: post.content,
            // Add template content property for compatibility
            templateContent: post.content,
        }));

        // Merge and sort by date (newest first)
        const allPosts = [...localPosts, ...formattedCodingBullPosts];
        return allPosts.sort((a, b) => {
            const dateA = a.date || a.data.date;
            const dateB = b.date || b.data.date;
            return dateB - dateA;
        });
    });

    config.addCollection("links", collection => {
        return [...collection.getFilteredByGlob("./src/links/*.md")].reverse();
    });

    config.addFilter("excerpt", post => {
        const content = post.replace(/(<([^>]+)>)/gi, "").trim();
        const limit = 200;

        let cutIndex = content.lastIndexOf(" ", limit);
        if (cutIndex === -1) cutIndex = limit;

        // Find the first line break to avoid including subsequent paragraphs in the excerpt
        const firstLineBreak = content.indexOf("\n");

        // Use line break if it exists and is earlier than the character limit cutoff
        if (firstLineBreak > 0 && firstLineBreak < cutIndex) {
            cutIndex = firstLineBreak;
        }

        return content.substring(0, cutIndex) + "...";
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
