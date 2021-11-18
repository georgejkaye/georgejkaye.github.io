const yaml = require("js-yaml");

module.exports = config => {
    config.addPassthroughCopy("images")
    config.addPassthroughCopy("files")
    config.addPassthroughCopy("scripts")
    config.addDataExtension("yml", contents => yaml.load(contents))
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