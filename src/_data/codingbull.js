const EleventyFetch = require("@11ty/eleventy-fetch");
const Parser = require("rss-parser");

module.exports = async function () {
    try {
        const rssUrl = "https://codingbull.dev/feed.xml";
        const parser = new Parser();

        console.log("[CodingBull] Fetching RSS feed from:", rssUrl);

        // Fetch the RSS feed with caching (1 day cache)
        const xml = await EleventyFetch(rssUrl, {
            duration: "1d",
            type: "text",
        });

        console.log("[CodingBull] RSS feed fetched successfully");

        // Parse the RSS feed
        const feed = await parser.parseString(xml);

        console.log(`[CodingBull] Found ${feed.items?.length || 0} posts`);

        // Transform RSS items to match blog post structure
        const posts = feed.items.map((item, index) => {
            console.log(
                `[CodingBull] Post ${index + 1}: ${item.title} (${item.pubDate || item.isoDate})`
            );
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

        console.log(`[CodingBull] Successfully processed ${posts.length} posts`);
        return posts;
    } catch (error) {
        console.error("[CodingBull] Error fetching RSS feed:", error);
        return [];
    }
};
