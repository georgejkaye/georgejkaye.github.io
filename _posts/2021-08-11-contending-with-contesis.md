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

## Prologue

In the good old days before the pandemic and before everyone in the computer science department dropped off the face of the earth, the Theory Group had a [nice website](https://github.com/jamievicary/birmingham-theory) with all our faces on it, maintained by resident website guru Jamie.
It wasn't anything fancy but most importantly it *worked*.
Updating this site was a breeze: just submit a pull request and within the next 24 hours your face would now be on the CS website for all the world to see.
While this did have the unfortunate drawback that everyone could see your face, it did mean that you could actually convince people that you were a student and not a raving madman, which can be quite tricky in our line of work.

## Act 1: *La disparition*

Fast-forward to mid-2020, when something went wrong with the cookie breaks website.
I was informed that there were some machinations going on behind the scenes, and at some point everything hosted on the CS servers would be transferred to the central university servers.
Being the conscientious individual that I am, I stored this fact away in my mind for future use and then promptly forgot about it.
However it turned out that this piece of information would be very important later on.

Several months later, the theory website that had served us so well vanished without a trace, and attempting to visit it just redirected you to the root computer science page.
There was a mild furore in the Theory Microsoft Teams team in which everyone tried to work out what had happened.
Eventually it was revealed that the transfer to the central site had gone ahead and a lot of things that had once lived on the CS servers had been jettisoned into the ether, never to return.
More importantly, this meant that all non-staff faces had also been jettisoned with them: we had been demoted to a list inside a container that wasn't even visible when you loaded the page.

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

For those less well versed in HTML lore, this wysiwyg approach is probably good, and indeed may be the only way they know how to.
And I acknowledge this: the problem is that we are a computer science department, and a lot of us *do* know what we're doing!
This illuminates why this centralised system just doesn't work: if we limit everyone to the lowest common denominator then the people up top are going to get very frustrated.

The ideal solution is obviously to teach everyone HTML, but I don't think people are going to want to do this.

## Act 2: Back and forth

Regardless of how much of a good idea it was, the centralisation *had* happened and our pretentious computer science opinions would not be heard.
And this meant that our faces were nowhere to be seen!
This had to be fixed.
But who would be up to such a task?
Enter intrepid theorists [Tom de Jong](https://www.cs.bham.ac.uk/~txd880/) and, as always, [yours truly](https://georgejkaye.com).

![A crudely edited image where the faces of Tom de Jong and myself are pasted over the faces of Sherlock and Watson from the BBC series Sherlock, standing in front of the door to 221B Baker Street](/images/adventures/contensis/sherlock.webp)

*Tom de Jong and I begin our search for our faces.*

Our first line of attack was to get [Anupam](https://anupamdas.com), the current 'content owner' of the theory website, to do it for us.
This would save us the job of having to do all the formatting ourselves, allowing us to get on with our *incredibly important* research into the less than symbol and inkscape.
Most of the hard work of actually getting the images wasn't even necessary, as they still remained within Jamie's repo, unserved to the world at large.

However, this simple mission turned out to be anything but, as it turned out that it was quite hard to get hold of Anupam for various holiday and work-related reasons.
Tom and I alternated between sending messages on various platforms, such as the incredibly active Microsoft Teams team and even electronic mail!
But our efforts were met with little success, as nothing happened.
At one point we changed tack, and offered to help out on the website ourselves, thinking ourselves competent enough to dip our toes into the mire.
This suggestion was received positively, and yet nothing happened anyway.
A message would have to be passed up the chain of command to central contensis control, and this small task was apparently quite difficult to do!

Many months passed, 2020 became 2021, a third national lockdown was called, lived through, and relaxed, and eventually winter became spring became summer.
There was only one option left: I would have to seek out Anupam in person.
And there was a perfect time to do this: the first lunch back after my internship!
This took place at the [scene of an earlier adventure](https://www.georgejkaye.com/2021/05/13/adventures-in-academia-part-four/), but his time there were no pies in sight!
In fact, I had been promised fish and chips, but there were no fish and chips, so actually I got a crazy vegan burger with avocado mayo instead.
Filled with the millenial energy endowed to me by this green sauce, I prepared to bring up the topic of the website.
This was a problem since the lunchtime chat was of course filled with all sorts of inane discourse, and it was very hard to get a word in edgeways!
At one point [Ming](https://puzzledoyster.github.io/) was asked if he would pose for some prospectus pictures, which the rest of us watched while guffawing heartily.
Eventually there was a natural lull, and I managed to take control of the conversation in order to bring up the website.
Anupam acknowledged that this had to be done, and promised to send the email that afternoon,
Before I left to go home, I poked my head into Anupam's office, spooked him, and reminded him to send the email.

On Monday, we looked on the theory page and discovered to our delight that our faces had arrived!
Success!
It seemed that our epic quest had finally come to an end.
However, upon closer inspection, it became clear that there was a problem.
When you looked at the page on your phone, as all trendy theorists such as myself would do, our faces spilled out of the central content container and into the wilderness of the page margins.
Despite the purpose of contensis being to make usable *responsive* pages, Anupam had managed to create a page that didn't render well on mobile!
This was an incredibly impressive feat and quite funny, but it did have the unfortunate side effect that our faces didn't look very good.

As luck would have it, I have [some history with making things look good on mobile](https://github.com/jamievicary/act2021/pull/6).
If this page had been on github I would have been able to solve the problem in circa ~~10~~ 60 minutes.
But the astute reader will observe from what I have written thus far that this was not the case!
We needed permissions; permissions we did not have!

But then, a couple of days later, we received an email.

## Act 3: Into the breach

![A crudely edited image where the faces of Tom de Jong and myself are pasted over the faces of the two Men in Black, Agent (de) Jay and Agent Kay, who are wielding large weapons](/images/adventures/contensis/menintheory.webp)

*Tom de Jong and I prepare to tackle the mess that is the theory website.*

Tom and I had been CC'd into an email sent by Anupam to the higher powers.
We were about to be enrolled on the Contensis training course!




While I 




![Our improved grid of PhD students on the theory page, where each image is the same size and all in line](/images/adventures/contensis/people.webp)

*The improved grid of PhD students.*
*Notice anyone familiar?*

## Act 3½: The loose ends

With this immense task
However there was one thing 
Anupam himself had mooted that this big list of staff was 
I agreed, and while Tom was initially uncertain, he eventually came to see the light and accepted that this should be done.

We opted to undertake this task on the next Friday.
But disaster struck, as Tom was apparently busy!
This meant we would have to postpone until the next week.
Safe in the knowledge that I had nothing important to do, I went to my meetings and the true final destination: the pub!

While I was enjoying a nice drink (and being abused for my choice of a gin, the nation's favourite spirit, over a more manly pursuit such as commercialised urine), and tucking into a slice of pie, something astounding was happening.
Tom was apparently not busy after all, and moreover was bored, so he had gone into overdrive and had translated the rest of the theory page into our new style.
This meant I had nothing to do except look at the page, make appreciative sounds, and send a thumbs up emoji.
What a rollercoaster of a Friday!



## Epilogue

So 


Although, the PhD students still aren't on the main staff list.
They used to be, a
It seems that the great battle has only just begun...


## Postscript

The canonical method I present to people to get to the theory site is still to go to my website first, and then click on the link in the first paragraph, because navigating to it through the uni site is a mess.
Ah well, you can't have everything.

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