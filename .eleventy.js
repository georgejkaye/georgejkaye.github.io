const yaml = require("js-yaml");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = config => {
    config.addPassthroughCopy("images")
    config.addPassthroughCopy("files")
    config.addPassthroughCopy("scripts")
    config.addDataExtension("yml", contents => yaml.load(contents))
    config.addPlugin(syntaxHighlight)
    config.setBrowserSyncConfig({
        files: './build/css/**/*.css'
    });
    return {
        dir: {
            input: "src",
            output: "build",
            includes: "includes",
            data: "data"
        }
    }
}