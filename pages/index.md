---
layout: page
tagline: Welcome to my website!
title: Home
permalink: /
---

Hello! I'm George, a PhD student researcher at the University of Birmingham, under the supervision of [Dan Ghica](https://www.cs.bham.ac.uk/~drg/) and [Miriam Backens](https://www.cs.bham.ac.uk/~backensm/)!
Currently I'm on an internship at the [Huawei Edinburgh Programming Languages Lab](https://blogs.ed.ac.uk/he-lab/).

I am a member of the [University of Birmingham Theory Group](https://www.birmingham.ac.uk/research/activity/computer-science/theory-of-computation).

### Contact me

**University:** g.j.kaye at cs.bham.ac.uk

**Where to find me:** Office 244 (Desk J), School of Computer Science, University of Birmingham

## About me

My primary research interests are in graphical calculi for compositional systems and the lambda calculus using monoidal categories, and reasoning about these structures diagrammatically and by using graph rewriting techniques. I am also interested in general programming languages and compilers. On a more practical side, I enjoy making and experimenting with visualisers for various theoretical concepts.

![fadd.svg](images/circuit.svg)
{: style="text-align: center" }

Currently I am working on a diagrammatic semantics for digital circuits, motivated by the work of Ghica and Jung \[[1](https://doi.org/10.1109/FMCAD.2016.7886659)\] \[[2](https://doi.org/10.4230/LIPIcs.CSL.2017.24)\]. I am using a variant of [hypergraphs](https://en.wikipedia.org/wiki/Hypergraphs) that are a sound and complete calculus for symmetric traced monoidal categories. The ultimate aim of this project is to define an automatic rewriting system for these hypergraphs that we can use as an effective and *efficient* operational semantics for digital circuits.

When I'm not researching, I play the piano and go on adventures usually involving trains, canals or both. I occasionally take photos of pretty things and put them on [Instagram](https://www.instagram.com/georgejkaye/). If you want something less pretty, here are some [pictures](/pictures) of me! I also (very rarely) use [Twitter](https://twitter.com/thegeorgejkaye).

I'm currently School of Computer Science [Cookie Break](https://www.cs.bham.ac.uk/internal/research_students/cookiebreaks/) admin! The Cookie Break is the School's longest running social event and it's an honour to be in charge of such an esteemed tradition.

You might want to read [my CV](/pages/cv.pdf).

## Publications

Click a publication to read the abstract.

**Rewriting Graphically With Symmetric Traced Monoidal Categories** \[[pdf](/pages/papers/2021-03-19-rewriting.pdf)\] \[[arxiv](https://arxiv.org/abs/2010.06319)\] \[[bibtex](/pages/papers/2021-03-19-rewriting.bib.txt)\]  
Arxiv preprint *with [Dan Ghica](https://www.cs.bham.ac.uk/~drg/)*  
{: class="publication" id="hypergraphs" }

*We examine a variant of hypergraphs that we call interfaced linear hypergraphs, with the aim of creating a sound and complete graphical language for symmetric traced monoidal categories (STMCs) suitable for graph rewriting. In particular, we are interested in rewriting for categorical settings with a Cartesian structure, such as digital circuits. These are incompatible with previous languages where the trace is constructed using a compact closed or Frobenius structure, as combining these with Cartesian product can lead to degenerate diagrams. Instead we must consider an approach where the trace is constructed as an atomic operation. Interfaced linear hypergraphs are defined as regular hypergraphs in which each vertex is the source and target of exactly one edge each, equipped with an additional interface edge. The morphisms of a freely generated STMC are interpreted as interfaced linear hypergraphs, up to isomorphism (soundness). Moreover, any linear hypergraph is the representation of a unique STMC morphism, up to the equational theory of the category (completeness). This establishes interfaced linear hypergraphs as a suitable combinatorial language for STMCs. We then show how we can apply the theory of adhesive categories to our graphical language, meaning that a broad range of equational properties of STMCs can be specified as a graph rewriting system. The graphical language of digital circuits is presented as a case study.*
{: class="abstract" id="hypergraphs-abstract" }

### Masters project

**A visualiser for linear lambda-terms as rooted 3-valent maps** \[[page](/lambda-visualiser)\] \[[pdf](/pages/papers/2019-04-08-masters.pdf)\]  
Masters dissertation *supervised by [Noam Zeilberger](http://noamz.org)*
{: class="publication" id="lambda" }

*We detail the development of a set of tools in Javascript to aid in the research of the topological properties of linear λ-terms when they are represented as 3-valent rooted maps. A λ-term visualiser was developed to visualise a λ-term specified by the user as a rooted map on the screen. The visualiser also includes functionality related to normalisation of terms, such as the option to view a normalisation graph or reduce a term to its normal form. To complement this a λ-term gallery was created to generate λ-terms that satisfied criteria specified by the user, and display their corresponding maps. While the focus of the project was on linear λ-terms, these tools also work for all pure λ-terms. The tools can be used for a variety of different applications, such as examining the structure of different terms, disproving conjectures regarding various subsets of the λ-calculus, or investigating special normalisation properties held by different sets of λ-terms. We evaluate the tools' success and acknowledge that while the tools suffer from performance issues when used for larger terms, they still fulfil many of the original aims of the project, and may still be very useful for systematic exploration of the λ-calculus in the future.*
{: class="abstract" id="lambda-abstract" }

## Talks

**Diagrammatic Semantics with Symmetric Traced Monoidal Categories**  
[Huawei Edinburgh PL Group Tech Talk](https://blogs.ed.ac.uk/he-lab/category/tech-talk/) *March 4, 2021* \[[slides](pages/talks/2021-03-04-huawei.pdf)] \[[page](https://blogs.ed.ac.uk/he-lab/2021/03/08/george-kaye-diagrammatic-semantics-with-symmetric-traced-monoidal-categories/)\] \[[video](https://youtu.be/UbTke5d2-Xs)\]

**Diagrammatic Semantics for Digital Circuits**  
[SYNCHRON 2020](http://synchron2020.inria.fr) *November 27, 2020* \[[slides](/pages/talks/2020-11-27-synchron.pdf)]\[[video](https://youtu.be/vaVt0EskUcE)\]

**The Graphical Language of Symmetric Traced Monoidal Categories**  
[Birmingham Theory PhD Seminar](http://talks.bham.ac.uk/show/index/1803) *November 23, 2020* \[[slides](/pages/talks/2020-11-23-bravo.pdf)]

**Diagrammatic Semantics for Digital Circuits (basic talk)**  
[Research skills presentation](https://www.birmingham.ac.uk/postgraduate/courses/taught/maths/module/applied/research-skills.aspx) *January 27, 2020* \[[slides](/pages/talks/2020-01-27-research-skills.pdf)\]

**A visualiser for linear lambda-terms as rooted 3-valent maps**  
[CLA 2019](http://cla.tcs.uj.edu.pl/history/2019/) *July 1, 2019* \[[slides](/pages/talks/2019-07-01-cla.pdf)\]

## Visits

[**SYNCHRON 2020, online**](http://synchron2020.inria.fr/) November 26-27, 2020

[**ACT 2020, online**](https://act2020.mit.edu/) July 6-10, 2020

~~[**SYCO 7, Estonia**](http://events.cs.bham.ac.uk/syco/7/) March 30-31, 2020~~

[**MGS Christmas Seminar**](https://staffwww.dcs.shef.ac.uk/people/G.Struth/mgs_xmas19.html) December 18, 2019

[**SYCO 6, Leicester**](http://events.cs.bham.ac.uk/syco/6/) December 16-17, 2019

[**CLA 2019, Versailles**](http://cla.tcs.uj.edu.pl/history/2019/) July 1-2, 2019

## Teaching

### 2020-21

[**Mathematical and Logical Foundations of Computer Science**](https://www.cs.bham.ac.uk/internal/modules/2020/06-35324/) University of Birmingham, teaching assistant

### 2019-20

[**Compilers & Languages**](https://www.cs.bham.ac.uk/internal/modules/2019/06-02578/) University of Birmingham, teaching assistant \[[ocaml tutorial](/ocaml)\]

[**Mathematical Foundations of Computer Science**](https://www.cs.bham.ac.uk/internal/modules/2019/06-30181/) University of Birmingham, teaching assistant

## Misc

[**Pictures**](/pictures) *Pictures of me*

[**Projects**](/projects) *Some things I've done*

[**Railway stations**](/stations) *Photographing all the stations in Great Britain*

[**Train simulator scenarios**](/trains)
