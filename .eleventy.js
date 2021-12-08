const yaml = require("js-yaml")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const moment = require("moment")
const lodashChunk = require("lodash.chunk")

module.exports = config => {
    config.addPassthroughCopy("images")
    config.addPassthroughCopy("files")
    config.addPassthroughCopy("scripts")
    config.addPassthroughCopy("CNAME")
    config.addPassthroughCopy("keybase.txt")
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
    config.addLiquidFilter("scenarioTitle", (scenario) => {
        return scenario.headcode + " " + scenario.time + " " + scenario.origin + " to " + scenario.destination
    })
    config.addLiquidFilter("scenarioSlug", (scenario) => {
        return scenario.headcode + "-" + scenario.time + "-" + scenario.origin.toLowerCase() + "-to-" + scenario.destination.toLowerCase()
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
    config.addCollection("routedScenarios", function (collection) {
        let scenarios = collection.getAllSorted()[0].data.scenarios
        let routed = []
        for (let scenario of scenarios) {
            for (let route of scenario.routes) {
                let routeScens = routed.find(rt => rt.name == route)
                if (routeScens) {
                    routeScens.scenarios.push(scenario)
                } else {
                    routed.push({
                        name: route,
                        scenarios: [scenario]
                    })
                }
            }
        }
        for (let route of routed) {
            let scens = route.scenarios.sort((a, b) => b.updated - a.updated)
            route.scenarios = scens
        }
        let sorted = routed.sort((a, b) => a.name.localeCompare(b.name))
        return sorted
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