const outdent = require("outdent")
const moment = require("moment")

const navLink = `<div class="nav-link"><a href={{ link.target }}>{{ link.title }}</a></div>`

const button = (array, target, title, text) =>
    array.push(
        outdent`<span class="link-button"><a href="${target}" title="${title}">${text}</a></span>`
    )

const buttonOrBlank = (array, key, link, title, text) => {
    if (key) {
        button(
            array,
            link,
            title,
            text
        )
    }
}

const makeButtons = (buttons) =>
    outdent`
        <div>
            ${buttons.reduce((acc, cur, i) => `${acc}${cur}${i == buttons.length - 1 ? "" : " • "}`, "")}
        </div>
    `

const paper = (paper, people) => {
    let titleText = `<span class="paper-title"> ${paper.title}</span>`
    let buttons = []
    buttonOrBlank(
        buttons,
        paper.page,
        paper.page,
        `Page for '${paper.page}`,
        "page"
    )
    buttonOrBlank(
        buttons,
        paper.arxiv,
        `/files/papers/${paper.file}.pdf`,
        `PDF version of '${paper.title}'`,
        `pdf`
    )
    buttonOrBlank(
        buttons,
        paper.arxiv,
        `https://arxiv.org/abs/${paper.arxiv}`,
        `Arxiv page for '${paper.title}'`,
        `arxiv`
    )
    button(
        buttons,
        `/files/papers/${paper.file}.bib.txt`,
        `Bibtex entry for '${paper.title}'`,
        `bibtex`
    )
    let buttonText = outdent`
        <div class="talk-buttons">
            ${makeButtons(buttons)}
        </div>
    `
    let detailsText = outdent`
        <div class="paper-details">
            ${paper.details}
        </div>`
    let authorText =
        outdent`<div class="paper-authors">
                ${paper.authors.reduce((acc, cur, i) => {
            let person = people[cur.name]
            let nameText =
                person.web
                    ? `<a href="${person.web}"
                                title="${person.name}${person.poss} personal webpage"
                                >${person.name}</a>`
                    : person.name
            return outdent`
                ${acc}<span class="author${cur.name == "me" ? " author-me" : ""}">${cur.text ? `${cur.text} ` : ""}${nameText}</span>${i != paper.authors.length - 1 ? ", " : ""}
            `
        }
            , "")}</div>`
    let abstractText = outdent`
        <div id="${paper.file}-abstract" class="paper-abstract" >
            ${paper.abstract}
        </div>
    `
    let paperReturn = outdent`
    <div class="card">
        ${titleText}
            ${authorText}${detailsText}${abstractText}${buttonText}
        </div>
    `
    return paperReturn
}

const talk = (talk) => {
    let date = talk.date.toUTCString()
    let prettyDate = moment.utc(date).format("MMMM DD, YYYY")
    let fileDate = moment.utc(date).format("YYYY-MM-DD")
    let buttons = []
    buttonOrBlank(
        buttons,
        talk.links.slides,
        `/files/slides/${fileDate}-${talk.key}-slides.pdf`,
        `Slides for '${talk.title}`,
        `slides`
    )
    buttonOrBlank(
        buttons,
        talk.links.abstract,
        `/files/abstracts/${fileDate}-${talk.key}-abstract.pdf`,
        `Extended abstract for ${talk.title}`,
        `extended abstract`
    )
    buttonOrBlank(
        buttons,
        talk.links.video,
        `${talk.links.video}`,
        `Video of '${talk.title}'`,
        `video`
    )
    buttonOrBlank(
        buttons,
        talk.links.github,
        `https://github.com/georgejkaye?tab=repositories&q=${talk.key}`,
        `Github repos for '${talk.title}`,
        `github`
    )
    let buttonText = outdent`<div class="talk-buttons">
        ${makeButtons(buttons)}</div>`
    return outdent`
        <div class="card">
            <div class="talk-title">${talk.title}</div>
            <div>
                <span class="talk-venue">
                    <a href="${talk.web}" title="${talk.venue} webpage">${talk.venue}</a>
                </span>
                <span class="talk-date">
                    ${prettyDate}
                </span>
            </div>
            ${buttonText}
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
        <div class="card">
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
    let buttons = []
    if (teaching.links) {
        makeButtons(
            teaching.links.map((link) =>
                button(
                    buttons,
                    link.target,
                    link.title,
                    link.text
                ))
        )
    }
    return outdent`
        <div class="card">
        ${first}
        ${buttons}
        </div ></div >
    `
}

const misc = (link) => {
    let text = link.text
        ? `<span class="misc-text">${link.text}</span>`
        : ""
    return outdent`
    <p>
        <span class="misc-link"><a href="${link.target}">${link.page}</a></span>
        ${text}
    </p>
    `
}

module.exports = { talk, visit, teaching, paper, navLink, misc }