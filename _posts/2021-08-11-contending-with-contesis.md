---
layout: post
title: Contending with Contensis
subtitle: "Website woes"
tags: [contensis, website]
image: /images/adventures/contensis/matrix.webp
alttext: The scene from The Matrix where Neo stops all the bullets.
tagline: An attempt to get our faces on the theory website leads Tom de Jong and I into the seemingly endless rabbit hole that is the category of content management systems.
disclaimer: "These are just my views, not the views of the University or the Computer Science department"
---

## Prologue: Before the storm

In the good old days before the pandemic and before everyone in the computer science department dropped off the face of the earth, the Theory Group had a [nice website](https://github.com/jamievicary/birmingham-theory) with all our faces on it, maintained by resident website guru Jamie.
It wasn't anything fancy but most importantly it *worked*.
Updating this site was a breeze: just submit a pull request and within the next 24 hours your face would now be on the CS website for all the world to see.
While this did have the unfortunate drawback that everyone could see your face, it did mean that you could actually convince people that you were a student and not a raving madman, which can be quite tricky in our line of work.

## Act 1: *La Disparition*

Fast-forward to mid-2020, when something went wrong with the cookie breaks website.
I was informed that there were some machinations going on behind the scenes, and at some point everything hosted on the CS servers would be transferred to the central university servers.
Being the conscientious individual that I am, I stored this fact away in my mind for future use and then promptly forgot about it.
However it turned out that this piece of information would be very important later on.

Several months later, the theory website that had served us so well vanished without a trace, and attempting to visit it just redirected you to the root computer science page.
There was a mild furore in the Theory Microsoft Teams team in which everyone tried to work out what had happened.
Eventually it was revealed that the transfer to the central site had gone ahead and a lot of things that had once lived on the CS servers had been jettisoned into the ether, never to return.
More importantly, this meant that all non-staff faces had also been jettisoned with them.

The reasoning behind the shift to the central system was to bring all the university pages under one big umbrella, to ensure consistency between sites.
The key component of this is forcing every department to make pages on Contensis, the university's content management system.
Crucially, this would also ensure that the site complied with numerous (and important!) disability regulations, such as providing useful information to screen-readers.
This is a fair point: it's essential that all the content on the website is accessible by all, otherwise there would be no point in putting the content up there in the first place!

The problem is that the 'solution' to this problem actually causes more problems than it solves!
Centralising control of the website may seem appealing: if we have everything in one place, surely it will be easier to keep under control?
And perhaps this might be the case, but only because making changes is so painful to do in the first place!
The main problem with centralising the website is that it just adds another layer of complexity to the whole procedure.
Gone are the days when we could just rustle up an HTML page, place it in our home directory and have it served straight away to the web.
Now we have to get to grips with this janky system, wrestle with the interface, and submit everything for approval before it can be served at all.
And this means more authentication, more sending emails to people you've never met in your life, and just altogether far more hassle.
It doesn't help that designing pages in this way is arguably more difficult than just as raw HTML, but we'll get to that later!
In fact, adding this extra effort can put off potential contributors altogether, so the content on the site is less useful or relevant than we might like.

For example, this shift in the website continuum had also caused the death of the cookie breaks site.
Most importantly, this isn't just a static site: there's all sorts of arcane PHP (that I don't understand) going on behind the scenes so that our cookie breaks can be organised efficiently: this isn't something that can just be replicated using a Wordpress-style wysiwyg editor!
Back in the day all the code would just sit in a directory on the CS server, and the magic would just happen: this isn't the case with the centralised server.
However this tale may yet have a happy ending: I have been proposed a solution involving a docker container and lots of spare time, so we'll see how that goes.
The only downside is that now I have to decipher what the cookie break code actually does.

For those less well versed in HTML lore, this wysiwyg approach is probably good, and indeed may be the only way they know how to
And I acknowledge this: the problem is that we are a computer science department, and a lot of us *do* know what we're doing!
This illuminates why this centralised system just doesn't work: if we force everyone.

If we need to ensure that all our pictures have alt text, *we can do that*!
If we need to have a consistent interface, then this can be done with a template that gets included in the , and a university stylesheet.
Draft up a list of important points to keep in mind, and we will stick to them.
And we'll get it done a lot faster too!

## Act 2: Back and forth 

## Act 3: Getting down to business

## Epilogue: The next dilemma

So 
Although, the PhD students still aren't on the main staff list.
They used to be, a

It seems that the great battle has only just begun...


## Case study: Breadcrumb bonanza

A particular (and minor) problem I have with the website as it is currently is how the server directories are arranged behind the server
With everything on a central server, we suddenly have many different disciplines mixing together.
We now have a question: do we organise things like `/department/research-topic` or have a central `/research` directory such that we have `/research/department/research-topic`?
The former would be my preference: this way we can keep each department self-contained, and any information about this department would be contained within their subsite `/department`.
This would mean the overall site is organised very cleanly, and a visitor looking for something to do with computer science knows that it will be under `/schools/computer-science`.

```
                           index
                             |
             _____________schools________________
            |                  |                 |
       ___compsci__          maths            physics
      |            |
   teaching     research
      |            |
    modules      theory
```   

However, the university have opted for the other approach, which means that we have incidents like the following:

```c
// computer science index page
/schools/computer-science/index.aspx 
// click on 'Computer Science research'
/research/engineering-sciences/computer-science.aspx
// click on 'Theory of Computation'
/research/activity/computer-science/theory-of-computation/index.aspx
```

At each stage of my journey, I make one click and the breadcrumb trail is completely transformed!
I can perhaps allow the first change: while I would prefer to have a single path `/schools/computer-science/research`, some might argue that we want to keep the `school` and the `research` trees separate.
Fair enough.
But the transition to `research/activity/computer-science` comes out of nowhere and makes absolutely no sense at all.

An interesting (and infuriating) side effect of all this is that I can't click back to the 'index' CS page from the 'Theory of computation' page, because the breadcrumb trail at the top of the page is just

```
Home > Research > Theory of computation
```

and there's no mention of computer science at all!
Of course, I have a 'back' button, but what if I've come through lots of pages and want to quickly return to the CS index?
There's no easy way of doing things.
Once again, an additional layer of complication is being added to things that make even the basic usage more of a chore than it needs to be.

If we had our own server, then we would be able to enforce a more sensible and self-contained file tree, indeed as we used to have.
As it stands, we now have to ensure our page structure is compatible with the monstrosity that is the central server structure.
