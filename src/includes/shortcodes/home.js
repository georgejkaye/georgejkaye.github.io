const outdent = require("outdent")
const moment = require("moment")

const navLink = `<div class="nav-link"><a href={{ link.target }}>{{ link.title }}</a></div>`

const button = (target, title, text) =>
    outdent`<span class="link-button">[<a href="${target}" title="${title}">${text}</a>]</span>`

const buttonOrBlank = (key, link, title, text) => (
    key
        ? button(
            link,
            title,
            text
        )
        : ""
)

const makeButtons = (buttons) =>
    buttons.reduce((acc, cur, i) => `${acc}${cur}${i == buttons.length - 1 ? "" : " "}`, "")

const paper = (paper, people) => {
    let titleText = `<span class="paper-title">${paper.title}</span>`
    let buttons = [
        buttonOrBlank(
            paper.page,
            paper.page,
            `Page for '${paper.page}`,
            "page"
        ),
        buttonOrBlank(
            paper.arxiv,
            `/files/papers/${paper.file}.pdf`,
            `PDF version of '${paper.title}'`,
            `pdf`
        ),
        buttonOrBlank(
            paper.arxiv,
            `https://arxiv.org/abs/${paper.arxiv}`,
            `Arxiv page for '${paper.title}'`,
            `arxiv`
        ),
        button(
            `/files/papers/${paper.file}.bib.txt`,
            `Bibtex entry for '${paper.title}'`,
            `bibtex`
        ),
        outdent`
            [<span 
                title="Toggle the abstract for '${paper.title}'" 
                id="${paper.file}"
                class="toggle-abstract"
            >abstract</span>]
        `
    ]
    let buttonText = makeButtons(buttons)
    let detailsText = outdent`
        <div class="paper-details">
            ${paper.details}
        </div>`
    let authorText =
        paper.authors.reduce(
            (acc, cur, i) => {
                let person = people[cur.name]
                let nameText =
                    person.web
                        ? `<a href="${person.web}"
                            title="${person.name}${person.poss} personal webpage"
                            >${person.name}</a>`
                        : person.name
                return outdent`
                    ${acc}
                    <span class="author${cur.name == "me" ? " author-me" : ""}">${cur.text ? `${cur.text} ` : ""}${nameText}</span>${i != paper.authors.length - 1 ? ", " : ""}
                `
            }
            , "")
    let abstractText = outdent`
        <div id="${paper.file}-abstract" class="paper-abstract">
            ${paper.abstract}
        </div>
    `
    let paperReturn = outdent`
        <div class="paper">
            ${titleText}
            ${buttonText}
            ${detailsText}
            ${authorText}
            ${abstractText}
        </div>
    `
    return paperReturn
}

const talk = (talk) => {
    let date = talk.date.toUTCString()
    let prettyDate = moment.utc(date).format("MMMM DD, YYYY")
    let fileDate = moment.utc(date).format("YYYY-MM-DD")
    let buttons = [
        buttonOrBlank(
            talk.links.slides,
            `/files/slides/${fileDate}-${talk.key}-slides.pdf`,
            `Slides for '${talk.title}`,
            `slides`
        ),
        buttonOrBlank(
            talk.links.abstract,
            `/files/abstracts/${fileDate}-${talk.key}-abstract.pdf`,
            `Extended abstract for ${talk.title}`,
            `extended abstract`
        ),
        buttonOrBlank(
            talk.links.video,
            `${talk.links.video}`,
            `Video of '${talk.title}'`,
            `video`
        ),
        buttonOrBlank(
            talk.links.github,
            `https://github.com/georgejkaye?tab=repositories&q=${talk.key}`,
            `Github repos for '${talk.title}`,
            `github`
        )
    ]
    let buttonText = makeButtons(buttons)
    return outdent`
        <div class="talk">
            <div class="talk-title">${talk.title}</div>
            <div>
                <span class="talk-venue">
                    <a href="${talk.web}" title="${talk.venue} webpage">${talk.venue}</a>
                </span>
                <span class="talk-date">
                    ${prettyDate}
                </span>
                ${buttonText}
            </div>
        </div>
    `
}

const visit = (visit) => {
    var output = outdent`
        <span class="visit-venue">
            <a href="${visit.web}" title="${visit.venue} webpage">${visit.venue}</a>
        </span>
        <span class="visit-city">${visit.city}</span>
        <span class="visit-dates">${visit.dates}</span>
    `
    var output = talk.cancelled ? outdent`<span class="visit-cancelled>${output}</span>` : output
    return outdent`
        <div class="visit">
            ${output}
        </div>
    `
}

const teaching = (teaching) => {
    var first = outdent`
            <div class="module-title">
                <a href=${teaching.web} title="Module page for ${teaching.title}">${teaching.title}</a>
            </div>
            <div>
                <span class="module-term">${teaching.term}</span>
                <span class="module-role">${teaching.role}</span>
                <span class="module-institution">${teaching.institution}</span>
    `
    let links = teaching.links
        ? makeButtons(
            teaching.links.map((link) =>
                button(
                    link.target,
                    link.title,
                    link.text
                ))
        )
        : ""
    return outdent`
        <div class="module">
        ${first}
        ${links}
        </div ></div >
    `
}

module.exports = { talk, visit, teaching, paper, navLink }