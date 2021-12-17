---
layout: default
title: The λ-term gallery
permalink: /lamviz/
tagline: A visualiser for λ-terms as rooted maps
type: project
---

My MSci final year project: a set of tools to help investigation of terms from various fragments of the λ-calculus.
The core function of the tools is to represent these λ-terms as *maps*.

These tools are currently being revamped in the chilly lockdown evenings - stay tuned!

## Documents

* [Dissertation](/files/papers/2019-04-08-masters.pdf) This is my dissertation for my Masters degree.
* [CLA 2019 talk](/files/talks/2019-07-01-cla.pdf) These tools were presented at [CLA 2019](http://cla.tcs.uj.edu.pl/history/2019/)!

## Tools

Two tools were made for the project:

* [**λ-term visualiser**](/lambda-visualiser/visualiser)
* [**λ-term gallery**](/lambda-visualiser/gallery)

### λ-term visualiser

![λ-term visualiser](/images/lamviz/visualiser.png)

This is a tool to visualise λ-terms as maps. A user can input a term and a set of free variables, and the tool will draw the corresponding map.

### λ-term gallery

![λ-term gallery](/images/lamviz/gallery.png)

This tool builds on the visualiser to generate galleries of λ-terms that fulfill certain critera. The primary parameters for generating terms are the size and the number of free variables. Terms can be generated from the pure, linear or planar λ-calculus. The generated terms can also be filtered by a number of different properties, such as crossings in the generated maps.

### λ-term portraits

![Redex 1](/images/lamviz/redex1.png)
![Redex 2](/images/lamviz/redex2.png)

All sorts of interesting information is provided about terms, such as the available beta-redexes. By hovering over these redexes, they will be highlighted in the term and on the visualised map. Reductions can be performed by clicking on the redexes, or alternatively the process can be animated in innermost or outermost strategies.

### Normalisation graphs

![Normalisation graph](/images/lamviz/normalisation-graph.png)
![Omega normalisation graph](/images/lamviz/omega.png)
Normalisation graphs can also be generated for terms!

## Source code

The source code can be found on [GitHub](http://github.com/georgejkaye/lambda-visualiser).
