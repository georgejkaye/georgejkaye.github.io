---
layout: default
title: Home
style: index
---

![A picture of me, with the Forth Bridge in the background]({{ people.me.picture }})
{: .mobile-picture}

![A picture of me, with the Forth Bridge in the background]({{ people.me.picture }})
{: .profile-picture}

Hello! I’m George, a PhD student researcher at the University of Birmingham, under the supervision of [Dan Ghica]({{ people.dan.web }}) and [Miriam Backens]({{ people.miriam.web }}).
I am a member of the [University of Birmingham Theory Group]({{ links.theory }}), and organise the research group's [weekly seminar](http://talks.bham.ac.uk/show/index/86).

Currently I also work part time at the [Huawei Edinburgh Programming Languages Lab](https://blogs.ed.ac.uk/he-lab/).

## About me

My primary research interests are in graphical calculi for compositional systems and the lambda calculus using monoidal categories, and reasoning about these structures diagrammatically using *string diagrams* and *graph rewriting*.
Currently I am working on developing the *categorical semantics for digital circuits with delay and feedback* first presented by [Ghica and Jung](https://doi.org/10.4230/LIPIcs.CSL.2017.24) using [symmetric traced monoidal categories](https://en.wikipedia.org/wiki/Traced_monoidal_category).
This gives us a *graphical calculus* with which we can reason about circuits *syntactically*.

When I'm not researching, I play the piano and go on adventures usually involving trains, canals or both.
I occasionally take photos of pretty things and put them on [Instagram]({{ links.instagram }}).
If you want something less pretty, here are some [pictures of me](/pictures)!
I also use [Twitter]({{ links.twitter }}).

You might want to read [mv CV]({{ links.cv }}).


## Contact me

* **University:** {{ people.me.email.uni }}
* **Personal:** {{ people.me.email.personal }}
* {{ people.me.address }}

## Misc

{% for link in misc %}
{% misc link %}
{% endfor %}

## Contributing

If you find a mistake, make an [issue](https://github.com/georgejkaye/georgejkaye.github.io/issues) and I'll try to sort it out.
Alternatively, you can fix it yourself with a [pull request](https://github.com/georgejkaye/georgejkaye.github.io/pulls)!
