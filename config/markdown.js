import markdownItDefault from 'markdown-it';
import markdownItAttrs from "markdown-it-attrs";
import markdownItKatex from "@vscode/markdown-it-katex";

const markdownIt = markdownItDefault({
    html: true,
    breaks: false,
    linkify: true,
});

const markdownLib = markdownIt.use(markdownItAttrs).use(markdownItKatex.default)

export default markdownLib;
