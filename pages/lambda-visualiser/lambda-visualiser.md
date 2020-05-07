---
layout: page2
title: Final Year Project
permalink: /lambda-visualiser/
type: project
---

## A visualiser for λ-terms as rooted maps

My MSci final year project: a set of tools to help investigation of terms from various fragments of the λ-calculus. The core function of the tools is to represent these λ-terms as *maps*. Background information can be found in the [Project Report](/pages/lambda-visualiser/docs/2019-04-08-final-report.pdf).

These tools were presented at [CLA 2019](http://cla.tcs.uj.edu.pl/)! You can download the slides [here](/pages/lambda-visualiser/docs/CLA'2019 - A visualiser for linear lambda-terms as rooted 3-valent maps.pdf).

## Tools

Two tools were made for the project:

* [**λ-term visualiser**](/lambda-visualiser/visualiser)
* [**λ-term gallery**](/lambda-visualiser/gallery)

### λ-term visualiser

![λ-term visualiser](/pages/lambda-visualiser/pics/visualiser.png)

This is a tool to visualise λ-terms as maps. A user can input a term and a set of free variables, and the tool will draw the corresponding map.

### λ-term gallery

![λ-term gallery](/pages/lambda-visualiser/pics/gallery.png)

This tool builds on the visualiser to generate galleries of λ-terms that fulfill certain critera. The primary parameters for generating terms are the size and the number of free variables. Terms can be generated from the pure, linear or planar λ-calculus. The generated terms can also be filtered by a number of different properties, such as crossings in the generated maps.

### λ-term portraits

![Redex 1](/pages/lambda-visualiser/pics/redex1.png)
![Redex 2](/pages/lambda-visualiser/pics/redex2.png)

All sorts of interesting information is provided about terms, such as the available beta-redexes. By hovering over these redexes, they will be highlighted in the term and on the visualised map. Reductions can be performed by clicking on the redexes, or alternatively the process can be animated in innermost or outermost strategies.

### Normalisation graphs

![Normalisation graph](/pages/lambda-visualiser/pics/normalisation-graph.png)
![Omega normalisation graph](/pages/lambda-visualiser/pics/omega.png)
Normalisation graphs can also be generated for terms!

## Documentation

The [**Project Proposal**](/pages/lambda-visualiser/docs/2018-10-26-project-proposal.pdf) is a brief overview of the aim of this project and a possible schedule.

The [**Scientific Paper**](/pages/lambda-visualiser/docs/2018-11-23-scientific-paper.pdf) gives some background on the topics involved, and how the project was progressing towards the end of November.

The [**Project Report**](/pages/lambda-visualiser/docs/2019-04-08-final-report.pdf) is the report from the end of the project - the dissertation!

## Source code

The source code can be found on [GitHub](http://github.com/georgejkaye/lambda-visualiser).
