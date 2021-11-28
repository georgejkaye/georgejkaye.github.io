const yaml = require("js-yaml");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const moment = require("moment");

module.exports = config => {
    config.addPassthroughCopy("images")
    config.addPassthroughCopy("files")
    config.addPassthroughCopy("scripts")
    config.addLiquidFilter("join", function (arr) {
        var str = ""
        for (const s of arr) {
            str += s
        }
        return str
    });
    config.addLiquidFilter("first", function (arr) {
        return arr[0]
    });
    config.addLiquidFilter("last", function (arr) {
        return arr[arr.length - 1]
    });
    config.addLiquidFilter("slice", function (string, i, j) {
        return string.slice(i, j)
    });
    config.addLiquidFilter("firstChar", function (string) {
        return string.charAt(0).toLowerCase()
    })
    config.addLiquidFilter("increment", function (x) {
        return x + 1
    })
    // Inside the function you export...
    config.addLiquidFilter("prettyDate", (date) => {
        const utc = date.toUTCString();
        return moment.utc(utc).format("DD MMMM YYYY");
    });
    config.addDataExtension("yml", contents => yaml.load(contents))
    config.addPlugin(syntaxHighlight)
    config.setDataDeepMerge(true);
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