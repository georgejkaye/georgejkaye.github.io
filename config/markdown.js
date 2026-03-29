import markdownItDefault from 'markdown-it';
import markdownItAttrs from "markdown-it-attrs";
import markdownItKatex from "@iktakahiro/markdown-it-katex";

const markdownIt = markdownItDefault({
    html: true,
    breaks: false,
    linkify: true,
});

const markdownLib = markdownIt.use(markdownItAttrs).use(markdownItKatex)

export default markdownLib;
