---
layout: post
title: Contending with Contensis
subtitle: "Website woes"
post-tags: [contensis, website]
date: 2021-09-02
image: /images/adventures/contensis/matrix.webp
alt: The scene from The Matrix where Neo stops all the bullets.
tagline: An attempt to get our faces on the theory website leads Tom de Jong and I into the seemingly endless rabbit hole that is the category of content management systems.
disclaimer: "These are just my views, not the views of the University or the Computer Science department"
---

## Prologue

In the good old days before the pandemic and before everyone in the computer science department dropped off the face of the earth, the Theory Group had a [nice website](https://github.com/jamievicary/birmingham-theory) with all our faces on it, maintained by resident website guru Jamie.
It wasn't anything fancy but most importantly it *worked*.
Updating this site was a breeze: just submit a pull request and within the next 24 hours your face would now be on the CS website for all the world to see.
While this did have the unfortunate drawback that everyone could see your face, it did mean that you could actually convince people that you were a student and not a raving madman, which can be quite tricky in our line of work.

At some point something went wrong with the cookie breaks website.
While the issue was corrected, I was informed that there were some machinations going on behind the scenes, and at some point everything hosted on the CS servers would be transferred to the central university servers.
Being the conscientious individual that I am, I stored this fact away in my mind for future use and then promptly forgot about it.
The astute reader might be able to see what was about to happen.

Several months later, the theory website that had served us so well vanished without a trace, and attempting to visit it just redirected you to the root computer science page.
There was a mild furore in the Theory Microsoft Teams team in which everyone tried to work out what had happened.
Eventually it was revealed that the transfer to the central site had gone ahead and a lot of things that had once lived on the CS servers had been jettisoned into the ether, never to return.
More importantly, this meant that all non-staff faces had also been jettisoned with them: we had been demoted to a list inside a container that wasn't even visible when you loaded the page.

Even worse, the cookie break site vanished!
Now how would we know who would host the longest running social event in the school?

## In which I acknowledge the benefits of the new system

The reasoning behind the shift to the central system is to bring all the university pages under one big umbrella, to ensure consistency between sites.
The key component of this is forcing every department to make pages on Contensis, the university's content management system.
This means that sites can be constructed (somewhat) simply in a Wordpress-style wysiwyg editor with content controlled using various widgets and templates, creating consistency across the site.
Now I can get behind this: I like consistency and it is does make a site look far more professional, which presumably is what the university is trying to accomplish.
Indeed, the old CS website was a real mishmash of styles and sometimes looked like it came out of the nineties.

What you get out of Contensis is a *responsive* site that should look nice on all screens, even my [Samsung SGH-E250 from 2007](https://en.wikipedia.org/wiki/Samsung_SGH-E250) that I never used the internet on for fear of spending a lot of money.
Responsive web development is a big thing now and I've spent many hours trying to make my website look nice on mobile with some fancy CSS.
I also half-ironically spent far too long [trying to make the ACT 2021 website look good on mobile](https://github.com/jamievicary/act2021/pull/6), several weeks after the conference finished.
Maybe using a content management system can actually take out some of the stress of this process?

Even more importantly, the use of such a system also (in theory) ensures that the site complies with numerous (and important!) accessibility regulations, such as providing useful information to screen-readers.
This is an incredibly strong point: it's essential that all the content on the website is accessible by all, otherwise there would be no point in putting the content up there in the first place!
In fact, while writing this post I realised that my wanton use of strikethrough for comedic purposes would actually pose a problem for screenreaders, so I dutifully removed it all.
Food for thought!

## In which I rant about the systematic removal of phd presence from the website

However, the problem here is that this noble crusade for accessiblity is masking a different problem. in which the presence of computer science phd students has being systematically removed from the website!
There used to be a section on the CS staff list for phd students and their faces, but this was removed the year I started so I was never on it.
This should already have been ringing alarm bells, but in our naivete we assumed that the theory page would be all we'd ever need!
Apparently, this was a mistake.

The way that the new system works is that all staff have a profile set up with numerous properties (e.g. Computer Science, Theory, Theory lead and so on).
Then content managers can insert a special widget that can filter out the appropriate staff depending on what page you're on and how you set it up.
This is quite clever and in principle I think it is great to be able to have an automatically updating list so that you can edit a profile in one place and it updates sitewise.

However, this has its drawbacks.
First, the widget is too inflexible: for example, what if one doesn't want to have to show the whole spiel for every staff member, and just wants to show a concise grid of all staff?
Too bad, you can't.
You're limited to this voluminous list with big pictures and text that takes up quite a lot of space.

And of course, as the topic of this rant might imply, the phd students are nowhere to be seen in this list!
Despite what people may try to say, we *are not* just students: we contribute to the research community of the school and are an essential part of the system!
And we do lots of marking too!
I have been reliably informed by my smug European compatriots that phd students on the continent *are* in fact treated more like staff, so maybe we should take some ideas from them.

But the problems don't stop there!
Previously, all computer science phd students (and staff) had been able to serve their own webpage by putting a file in `~/public_html` on the school servers, and this would be hosted at [http://cs.bham.ac.uk/~gjk591](http://cs.bham.ac.uk/~gjk591) or something similar (or in my case, once you submit an IT ticket and make them change your undergrad privileges into postgrad ones).
You can click on mine to verify what I'm saying if you want, but you'll be wasting your time as it just redirects to this site.

However, new students have now been told that 'new university policy' is that these sites can't exist any more.
The primary reason is again because the `cs.bham` servers are being decommissioned, and we can't just have random pages from our home directory being served to the central server.
Moreover, we once again need to adhere to accessibility requirements, so the uni want everyone to do things through Contensis.
Of course, as we know '*having no website is much better than having a bad website*' (as said by the wise [Alex Rice](https://alexarice.github.io/)), so this is perfectly reasonable!

That was satire, it is ridiculous.

One might argue that nowadays the problem of getting online space is much smaller, as one can easily acquire a free `github.io` domain and host your content there, so we don't even *need* these pages!
But the issue isn't necessarily with *hosting* the content.
The benefit of having the old-style pages is that we can have an *official university domain* tied to our content and this, like having our faces on the site, makes us look a little bit more authentic.
This is especially important with *early career* academics who don't have the clout to wave around some random `george.biz` domain and have everyone immediately visit it to check out our exciting discoveries.

Of course, there is a very easy solution to this problem, which is just to give every phd student a space on the main website, which can even be managed through Contensis if needs be.
While this would require a non-trivial effort to get off the ground (there must be a fair few phd students at the university), however I believe the benefits of having personal spaces would outweigh this, and once the initial bulk of work is done, it would only need to be touched once new students leave or join.

## In which two plucky theorists try to save the day

Such a proposal would take months to get to anyone who actually had the power to sort this out, and in the end it probably wouldn't get sorted as they would drag their heels in and nothing would change.
We needed a solution that could be implemented *now*.
But who would be up to such a task?
Enter intrepid theorists [Tom de Jong](https://www.cs.bham.ac.uk/~txd880/) and, as always, [yours truly](https://georgejkaye.com).

![A crudely edited image where the faces of Tom de Jong and myself are pasted over the faces of Sherlock and Watson from the BBC series Sherlock, standing in front of the door to 221B Baker Street](/images/adventures/contensis/sherlock.webp)

*Tom de Jong and I begin our search for our faces.*

Our first line of attack was to get [Anupam](https://anupamdas.com), the current 'content owner' of the theory website, to do it for us.
This would save us the job of having to do all the formatting ourselves, allowing us to get on with our *incredibly important* research into the less than symbol and Inkscape.
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
Filled with the millennial energy endowed to me by this green sauce, I prepared to bring up the topic of the website.
This was a problem since the lunchtime chat was of course filled with all sorts of inane discourse, and it was very hard to get a word in edgeways!
At one point [Ming](https://puzzledoyster.github.io/) was asked if he would pose for some prospectus pictures, which the rest of us watched while guffawing heartily.
Eventually there was a natural lull, and I managed to take control of the conversation in order to bring up the website.
Anupam acknowledged that this had to be done, and promised to send the email that afternoon.

On Monday, we looked on the theory page and discovered to our delight that our faces had arrived!
Success!
It seemed that our epic quest had finally come to an end.
However, upon closer inspection, it became clear that there was a problem.
When you looked at the page on your phone, as all trendy theorists such as myself would do, our faces spilled out of the central content container and into the wilderness of the page margins.
Despite the purpose of Contensis being to make usable *responsive* pages, Anupam had managed to create a page that didn't render well on mobile!
This was an incredibly impressive feat and quite funny, but it did have the unfortunate side effect that our faces didn't look very good.

## In which the theorists finally achieve their goal

Several days later, we received an email.
Tom and I had been CC'd into an email sent by Anupam to the higher powers.
We were about to be enrolled on the Contensis training course!
Although we had been warned it was somewhat painful, it was in reality pretty simple to do (I made a cute page about string diagrams!) and after some time, we finally received the golden ticket: edit permissions for `/research/activity/computer-science/theory-of-computation/`.
It was time to do some damage.

![A crudely edited image where the faces of Tom de Jong and myself are pasted over the faces of the two Men in Black, Agent (de) Jay and Agent Kay, who are wielding large weapons](/images/adventures/contensis/menintheory.webp)

*Tom de Jong and I prepare to tackle the mess that is the theory website.*

We set up a zoom call and prepared to fix all that was wrong with the world.
It was then that we realised the true gravity of the task that awaited us.
I had imagined a workspace that, while perhaps inflexible, was somewhat responsive and easy to use, so that even people like me would be able to get stuck in with ease.
It turned out that Contensis was anything but!
It was slow, it was confusing, and it was incredibly hard to drag the widgets around the page without selecting the text on them.
Moreover, doing anything with images required you to upload them elsewhere and then navigate back to them from the page you were editing.

Despite the dread we felt, we remained optimistic and set about searching for a solution to the problem.
About three operations in, the system stopped responding and attempting to navigate anywhere within the `/research` subsite produced a `503` error.
Had we already managed to destroy the website within minutes of having edit permissions?
I sent a tweet to the IT people to ask if this was the case, but then everything started responding again.
I immediately deleted the tweet in case it was an admission of guilt, but later on the IT people managed to reply to it anyway.

We quickly discovered the problem with the current layout.
The trusty table was *not* a responsive element and would stubbornly refuse to wrap onto multiple rows if they were too long.
While I admired their tenacity, this was not what we wanted from our lovely responsive site.
Fortunately, our training was still fresh in our memories and we knew that the 'grid' was the responsive version that would scale and wrap appropriately with the size of the screen.
We were already Contensis champions!

But this presented us with a new problem.
People with long names, such as my long-suffering colleague [Todd Waugh Ambridge](https://www.cs.bham.ac.uk/~txw467/), would cause the images to be bumped down one line, so that the list of images was out of sync!
Obviously this looked rubbish and we had to change it.
After much umming and ahhing, the solution suddenly came to us: we could just put the text underneath the images instead.
Our genius was indeed staggering.

However there were still problems: just putting the text and image together in the grid cell didn't quite respond as well as we'd like: on small screens it would morph into strange patterns and the text would become separated from the pictures.
This was not ideal.
Fortunately Tom used his literature searching techniques to locate an 'image with caption' widget, that allowed us to glue the people's names to their faces: exactly what we wanted!
However, we also wanted to link the people's names to their webpages, and in this widget it only let you type in text and not link it anywhere.
I jokingly suggested that we could just inject HTML into the caption box and see if it worked.
We laughed heartily for a little bit and then realised that this plan was just crazy enough to work.
And it did.

After a tireless afternoon of cropping images and dragging widgets painfully around the webpage, we finally had the page in a way we wanted.
After ten months of absence, our faces once more graced the theory page in an aesthetically pleasing way.
The journey was over.

Except actually it wasn't, because when we checked out the published page, none of the pictures were there.
I found this curious given that Contensis was meant to make good pages and yet clearly this one wasn't quite there yet.
After a bit of poking around and emailing a man, we found out that in addition to publishing the page we also had to publish each new image separately.
Why this had not been flagged when we initially published the page was never discovered.

![Our improved grid of PhD students on the theory page, where each image is the same size and all in line](/images/adventures/contensis/people.webp)

*The improved grid of PhD students.*
*Notice anyone familiar?*

## In which I rant about why I don't like Contensis and what I would do about it

So we had managed to make a page in Contensis with our faces on it.
It had taken about three hours, which is far longer than it would have taken if we had done the same procedure in raw HTML.
The main problem is just how slowly Contensis runs when trying to perform any operation.
This makes the whole procedure a lot more frustrating than it needs to be, especially if you're just trying to add one image and put it somewhere.
The sluggishness is presumably partially due to running in the browser.
Perhaps there is a desktop version that runs a lot smoother, but I wasn't told about it!

For those less well versed in HTML lore, this wysiwyg approach is probably good, and indeed may be the only way they know how to.
And I acknowledge this: the problem is that we are a computer science department, and a lot of us *do* know what we're doing!
This illuminates one of my biggest problems with centralising everything: if we limit everyone to the lowest common denominator then the people with the higher denominators are going to get very frustrated.
It feels to me like railroading the content creators into using Contensis is actually very patronising and illustrates a lack of trust that we'll make something competent.
I'm sure there are people who would make completely incompetent HTML sites, but there are also those who can make very good ones!

The ideal solution is obviously to teach everyone HTML, but I don't think people are going to want to do this.
Although saying this, it probably takes just as long to get a working knowledge of HTML as it is to figure out what's going on with Contensis, so maybe it is a possibility.
What the system really needs is the *option* to go 'under-the-hood' and let us manipulate the actual HTML.
This strikes the perfect middle-ground: people who don't know what they're doing can continue about their business while we can get stuck in at the source.
Editing the source directly makes it a lot easier to manipulate the code of the page: we can copy and paste our widgets rather than having to try and find the three-pixel sweetspot that lets us drag it into the next column.
There are plenty of editors that allow you to swap between wysiwyg and raw HTML on the fly.
Since we're still only letting people edit the actual content of the page, we don't need to be too concerned about people messing up the consistent theming.
And if we're worried about people not knowing what they're doing, we can lock away the option until they've done some training course.

What about ensuring that whatever we write up is still accessibility-compliant?
Well, there are plenty of tools that can automatically check against key accessibility criteria and give you a report flagging up the main issues with the page.
I'm sure that these can be built into the system and if there are too many problems then the page can be outright rejected.

But now we have to be realistic.
With the student body getting larger every year, academics just don't have enough time to learn how to use HTML, Git, and who knows what else.
So with a heavy heart I accept that we'll be staying with Contensis for a while longer.
We have reasons to be positive though: now that they're introducing computer science and coding earlier and earlier throughout the curriculum, perhaps the next generation will be ready to make the leap!
Moreover, since lots of things are getting easier on Windows these days, when the glorious revolution comes we (probably) won't even have to make everyone install some obscure Linux distro just to be able to access their module webpage!
Who would have thought that Windows might be our saviour at the end of all of this?

## In which the phd students ascend to a higher plane

With our immense task done, we patted ourselves on the back and kept going back to the page every now and again to remark at how well we'd done.
But this wasn't the end of the story.
Anupam himself had mooted that the big list of staff at the top of the page was an eyesore: it took up too much space and widened the gulf between permanent staff and us lowly phd students.
Instead we should just put everything in the same grid style we had used before!
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

So that's the tale about how two theory phd students got our faces back on the theory page.
Although it is a small victory in the battle to get the phd students recognised, it is an important one and hopefully a sign of things to come.
Our next battle? Getting the phd students onto the main staff list.

Also the cookie break site needs to be resurrected.
But that's a tale for another time.

## Postscript

Comically, the canonical method I present to people to get to the theory site is still to go to my website first, and then click on the link in the first paragraph, because navigating to it through the uni site is a mess.
Ah well, you can't have everything.

If you're interested in checking out our work, you can find the finished page at [https://www.birmingham.ac.uk/research/activity/computer-science/theory-of-computation/people.aspx](https://www.birmingham.ac.uk/research/activity/computer-science/theory-of-computation/people.aspx).
