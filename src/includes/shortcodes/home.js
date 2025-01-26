const outdent = require("outdent")
const moment = require("moment")

const navLink = `<div class="nav-link"><a href="{{ link.target }}">{{ link.title }}</a></div>`

const button = (element, array, target, title, text) => {
    array.push(
        outdent`<span class="link-button"><a href="${target(element)}" title="${title(element)}">${text}</a></span>`
    )
}

const buttonOrBlank = (paper, array, key, link, title, text) => {
    if (key) {
        button(paper, array, link, title, text)
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
        paper,
        buttons,
        paper.page,
        (paper) => paper.page,
        (paper) => `Page for '${paper.page}`,
        "page"
    )
    buttonOrBlank(
        paper,
        buttons,
        paper.publication,
        (paper) => `https://doi.org/${paper.publication.doi}`,
        (paper) => `Published version of '${paper.title}'`,
        `paper`
    )
    buttonOrBlank(
        paper,
        buttons,
        paper.publication,
        (paper) => `/files/papers/${paper.publication.name}.pdf`,
        (paper) => `PDF of '${paper.title}' (published version)`,
        `(pdf)`
    )
    buttonOrBlank(
        paper,
        buttons,
        paper.arxiv,
        (paper) => `https://arxiv.org/abs/${paper.arxiv.id}`,
        (paper) => `Arxiv page for '${paper.title}'`,
        `arxiv`
    )
    buttonOrBlank(
        paper,
        buttons,
        paper.arxiv,
        (paper) => `/files/papers/${paper.key}.pdf`,
        (paper) => `PDF version of '${paper.title}' (arxiv version)`,
        `(pdf)`
    )
    buttonOrBlank(
        paper,
        buttons,
        paper.page,
        (paper) => `/files/papers/${paper.key}.pdf`,
        (paper) => `PDF version of '${paper.title}'`,
        `pdf`
    )
    buttonOrBlank(
        paper,
        buttons,
        paper.paper,
        (paper) => `/files/papers/${paper.key}.pdf`,
        (paper) => `PDF version of '${paper.title}'`,
        `pdf`
    )
    button(
        paper,
        buttons,
        (paper) => `/files/papers/${paper.key}.bib.txt`,
        (paper) => `Bibtex entry for '${paper.title}'`,
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
        <div id="${paper.key}-abstract" class="paper-abstract" >
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
        talk,
        buttons,
        talk.links.slides,
        (t) => `/files/slides/${fileDate}-${t.key}-slides.pdf`,
        (t) => `Slides for '${t.title}`,
        `slides`
    )
    buttonOrBlank(
        talk,
        buttons,
        talk.links.abstract,
        (t) => `/files/abstracts/${fileDate}-${t.key}-abstract.pdf`,
        (t) => `Extended abstract for ${t.title}`,
        `extended abstract`
    )
    buttonOrBlank(
        talk,
        buttons,
        talk.links.video,
        (t) => `${t.links.video}`,
        (t) => `Video of '${t.title}'`,
        `video`
    )
    buttonOrBlank(
        talk,
        buttons,
        talk.links.github,
        (t) => `https://github.com/georgejkaye?tab=repositories&q=${t.key}`,
        (t) => `Github repos for '${t.title}`,
        `github`
    )
    let buttonText = outdent`<div class="talk-buttons">
        ${makeButtons(buttons)}</div>`
    return outdent`
        <div class="card">
            <div class="talk-title">${talk.title}</div>
            <div>
                <span class="talk-venue">
                    <a href="${talk.web}" title="${talk.venue} webpage">${talk.venue}</a>,
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
        <div class="visit-venue">
            <a href="${visit.web}" title="${visit.venue} webpage">${visit.venue}</a>
        </div>
        <div>
            <span class="visit-city">${visit.city},</span>
            <span class="visit-dates">${visit.dates}</span>
        </div>
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
            <a href="${teaching.web}" title="Module page for ${teaching.title}">${teaching.title}</a>
        </div>
        <div><span class="module-term">${teaching.term}</span>
    `
    let buttons = []
    if (teaching.links) {
        makeButtons(
            teaching.links.map((link) =>
                button(
                    link,
                    buttons,
                    (link) => link.target,
                    (link) => link.title,
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