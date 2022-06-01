const yaml = require("js-yaml")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const moment = require("moment")
const lodashChunk = require("lodash.chunk")
const markdownIt = require("./config/markdown.js")
const { talk, visit, teaching, paper, navLink } = require("./src/includes/shortcodes/home")


module.exports = config => {
    config.setDataDeepMerge(true)
    config.setBrowserSyncConfig({
        files: './build/css/**/*.css'
    })

    config.addPassthroughCopy("images")
    config.addPassthroughCopy("files")
    config.addPassthroughCopy("scripts")
    config.addPassthroughCopy("CNAME")
    config.addPassthroughCopy("keybase.txt")

    config.addDataExtension("yml", contents => yaml.load(contents))

    config.addPlugin(syntaxHighlight)

    config.addShortcode("paper", paper)
    config.addShortcode("talk", talk)
    config.addShortcode("visit", visit)
    config.addShortcode("teaching", teaching)
    config.addShortcode("nav", navLink)

    config.setLibrary("md", markdownIt);

    /**
     * Remove newlines from titles of pages
     */
    config.addLiquidFilter("strip", function (str) {
        if (typeof (str) == "string") {
            return str.replace(" <br> ", " ")
        }
        return str
    })
    config.addLiquidFilter("increment", function (x) {
        return x + 1
    })
    /**
     * Get a date of the form 01 January 1970
     * Used for blogpost dates
     */
    config.addLiquidFilter("prettyDate", (date) => {
        const utc = date.toUTCString()
        return moment.utc(utc).format("DD MMMM YYYY")
    })
    /**
     * Get a date of the form January 01, 1970
     * Used for confererence/talk dates etc
     */
    config.addLiquidFilter("prettyDateMDY", (date) => {
        const utc = date.toUTCString()
        return moment.utc(utc).format("MMMM DD, YYYY")
    })
    /**
     * Get a date of the form 1970-01-01
     * Used for getting appropriate filenames
     */
    config.addLiquidFilter("fileDate", (date) => {
        const utc = date.toUTCString()
        return moment.utc(utc).format("YYYY-MM-DD")
    })
    /**
     * Get the title of the scenario from its metadata
     * Titles are in the form 1A01 1000 Birmingham Moor Street to London Marylebone
     */
    config.addLiquidFilter("scenarioTitle", (scenario) => {
        return scenario.headcode + " " + scenario.time + " " + scenario.origin + " to " + scenario.destination
    })
    /**
     * Get a slug for a scenario from its metadata
     * Slugs are in the form 1A01-1000-birmingham-moor-street-to-london-marylebone
     */
    config.addLiquidFilter("scenarioSlug", (scenario) => {
        return scenario.headcode + "-" + scenario.time + "-" + scenario.origin.toLowerCase() + "-to-" + scenario.destination.toLowerCase()
    })

    /**
     * Allows pagination of tag pages
     */
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
            if (tagName != "blog") {
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
        }
        return tagMap
    })
    /**
     * Make a collection of scenarios grouped by their route
     */
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

    return {
        dir: {
            input: "src",
            output: "build",
            includes: "includes",
            data: "data"
        }
    }
}