const outdent = require("outdent")
const markdownIt = require("../../../config/markdown")

const environment = (name, data, title) => {
    const content = markdownIt.renderInline(data)
    const className = name.toLowerCase()
    const environmentTitle = title == "" || title == undefined ? "" : `(${title})`
    return (outdent`
        <div class="${className}">
        <div class="${className}-name" > ${name} ${environmentTitle}</div >
            ${content}
        </div >
    `)
}

const definition = (data, name) => environment("Definition", data, name)
const example = (data, name) => environment("Example", data, name)
const proposition = (data, name) => environment("Proposition", data, name)
const theorem = (data, name) => environment("Theorem", data, name)
const proof = (data, name) => environment("Proof", data, name)
const remark = (data, name) => environment("Remark", data, name)

const figure = (data) => {
    const content = markdownIt.renderInline(data)
    return outdent`
        <div class="figure">
            ${content}
        </div>
    `
}

module.exports = { definition, example, proposition, theorem, proof, figure, remark }