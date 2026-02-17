const EleventyFetch = require("@11ty/eleventy-fetch");
const Parser = require("rss-parser");

module.exports = async function () {
    try {
        const rssUrl = "https://codingbull.dev/feed.xml";
        const parser = new Parser();

        // Fetch the RSS feed with caching (1 day cache)
        const xml = await EleventyFetch(rssUrl, {
            duration: "1d",
            type: "text",
        });

        // Parse the RSS feed
        const feed = await parser.parseString(xml);

        // Transform RSS items to match blog post structure
        const posts = feed.items.map(item => {
            return {
                title: item.title,
                date: new Date(item.pubDate || item.isoDate),
                url: item.link,
                content: item.contentSnippet || item.content || "",
                description: item.contentSnippet || item.content || "",
                isCodingBull: true,
                source: "CodingBull",
            };
        });

        return posts;
    } catch (error) {
        console.error("Error fetching CodingBull RSS feed:", error);
        return [];
    }
};
