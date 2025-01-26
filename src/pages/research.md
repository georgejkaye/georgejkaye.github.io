---
title: Research
permalink: /research/
style: research
---

I used to do research before I went off to do software development instead.
On this page you can find everything I did during that time; if you have any
questions, please don't hesitate to reach out!

* [Research interests](#research-interests)
* [Papers](#papers)
* [Talks](#talks)
* [Visits](#visits)
* [Teaching](#teaching)

## Research interests

My primary research interests are in graphical calculi for compositional systems and the lambda calculus using monoidal categories, and reasoning about these structures diagrammatically using [string diagrams](https://doi.org/10.48550/arXiv.0908.3347).

My PhD thesis detailed **a fully compositional theory of sequential digital circuits with delay and feedback**.
This project was based on work by [Ghica and Jung](https://doi.org/10.4230/LIPIcs.CSL.2017.24) who modelled digital circuits as morphisms in a [symmetric traced monoidal category](https://en.wikipedia.org/wiki/Traced_monoidal_category).
My job was to tidy this all up and make it formal, leading to three sound and complete semantics for sequential circuits:
a **denotational** semantics of monotone stream functions, a reductions-based **operational semantics**, and
an **algebraic semantics**.
Using recent work on [string diagram graph rewriting](https://doi.org/10.1145/3502719), this gives us a framework suitable
for performing **graph rewriting** on digital circuits.

## Papers

{% for paper in papers %}
{% paper paper people %}
{% endfor %}

## Talks

{% for talk in talks %}
{% talk talk %}
{% endfor %}

## Visits

{% for visit in visits %}
{% visit visit %}
{% endfor %}

## Teaching

{% for teach in teaching %}
{% teaching teach %}
{% endfor %}


