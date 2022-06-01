const markdownItDefault = require('markdown-it');
const markdownItAttrs = require("markdown-it-attrs")
const markdownItKatex = require("@iktakahiro/markdown-it-katex")

const markdownIt = markdownItDefault({
    html: true,
    breaks: false,
    linkify: true,
});

const markdownLib = markdownIt.use(markdownItAttrs).use(markdownItKatex)

module.exports = markdownLib;