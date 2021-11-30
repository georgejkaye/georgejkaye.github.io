const yaml = require("js-yaml")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const moment = require("moment")
const lodashChunk = require("lodash.chunk")

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
    })
    config.addLiquidFilter("strip", function (str) {
        if (typeof (str) == "string") {
            return str.replace(" <br> ", " ")
        }
        return str
    })
    config.addLiquidFilter("first", function (arr) {
        return arr[0]
    })
    config.addLiquidFilter("last", function (arr) {
        return arr[arr.length - 1]
    })
    config.addLiquidFilter("slice", function (string, i, j) {
        return string.slice(i, j)
    })
    config.addLiquidFilter("firstChar", function (string) {
        return string.charAt(0).toLowerCase()
    })
    config.addLiquidFilter("increment", function (x) {
        return x + 1
    })
    config.addLiquidFilter("reverse", function (arr) {
        return arr.reverse()
    })
    config.addLiquidFilter("prettyDate", (date) => {
        const utc = date.toUTCString()
        return moment.utc(utc).format("DD MMMM YYYY")
    })
    config.addCollection("doublePagination", function (collection) {
        let tagSet = new Set()
        collection.getAllSorted().map(function (item) {
            if ("tags" in item.data) {
                let tags = item.data.tags
                for (let tag of tags) {
                    tagSet.add(tag)
                }
            }
        })
        let paginationSize = 3
        let tagMap = []
        let tagArray = [...tagSet]
        for (let tagName of tagArray) {
            let tagItems = collection.getFilteredByTag(tagName)
            tagItems.reverse()
            let pagedItems = lodashChunk(tagItems, paginationSize)
            for (let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
                tagMap.push({
                    tagName: tagName,
                    pageNumber: pageNumber,
                    pageData: pagedItems[pageNumber],
                    pages: pagedItems.length
                })
            }
        }
        return tagMap
    })
    config.addDataExtension("yml", contents => yaml.load(contents))
    config.addPlugin(syntaxHighlight)
    config.setDataDeepMerge(true)
    config.setBrowserSyncConfig({
        files: './build/css/**/*.css'
    })
    return {
        dir: {
            input: "src",
            output: "build",
            includes: "includes",
            data: "data"
        }
    }
}