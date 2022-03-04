const outdent = require("outdent")
const markdownIt = require("../../../config/markdown")

module.exports = (data, name) => {
    const content = markdownIt.renderInline(data)
    console.log(content)
    return (outdent`
        <div class="definition">
            <div class="definition-name">Definition (${name})</div>
            ${content}
        </div>
    `)
}