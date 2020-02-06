---
layout: page2
title: Intro to Ocaml
permalink: /ocaml
---

*This is based on a tutorial I taught for the [Compilers & Languages](https://www.cs.bham.ac.uk/internal/modules/2019/06-02578/) module.*

So you want to learn Ocaml? Great - you're already on your way to joining the elite crowd that understand this fantastic (citation needed) language. Here you'll find a very basic tutorial to get you up and running with the language and its foibles.

## Installing OCaml

You will need:

* **[OPAM](https://opam.ocaml.org/doc/Install.html)**
* **[OCaml](https://ocaml.org/docs/install.html)**

You can then open the OCaml toplevel with `ocaml`. Alternatively (and I would recommend it!) you can install **UTop** with `opam install utop`, which gives you a much nicer command line interface by typing `utop` into the terminal.

There are various plugins for various text editors floating around. There is (of course) an Emacs mode: you will need **[Tuareg](https://github.com/ocaml/tuareg)** for running OCaml within Emacs and **[Merlin](https://github.com/ocaml/merlin)** for context-sensitive completion. For people like me who use VS Code, there is [this extension](https://marketplace.visualstudio.com/items?itemName=freebroccolo.reasonml) - this also provides support for ReasonML, a language based off OCaml that compiles to Javascript!

### Windows

OCaml on Windows is a fickle beast! To avoid struggling around with dependencies, I would recommend you install the **[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)** and download Ubuntu from the Microsoft Store. This enables you to have a Linux environment within your Windows installation!

Once you have installed the subsystem and set it up as specified in the link above, you must run these commands:

* `sudo apt update`
* `sudo apt install make m4 opam ocaml`
* `opam install utop ocamlbuild`

You will be prompted to input the password you created when installing the Linux Subsytem. During installation you may receive additional prompts for input - you should generally type 'y' (for yes). 

You should now be able to access the OCaml toplevel with `utop`, as above.

### Running OCaml

A majority of the code in this tutorial can be run in the *OCaml *toplevel**. You can access this by typing `ocaml` or `utop` (if it's installed). You can type things directly into the toplevel or paste functions from your text editor. If you keep your code in a file, you can type `#use file.ml` into the toplevel and the entire contents of the file will be pasted in (providing it all compiles!).

When you actually want to compile a file to an executable, you should use the command `ocamlbuild -use-ocamlfind file.native`. OCamlfind is a very powerful tool that will automatically resolve dependencies for you, regardless of how many modules you use! More on modules later.

## A statically typed language

[OCaml](https://ocaml.org/) is a functional programming language, It is statically typed, so everything has a distinct type (unlike dynamically typed programming languages like Python, where you can mash pretty much anything together without the compiler complaining). The advantage of statically typed languages is that more errors are caught at *compile-time* rather than *run-time*. For example, something like `"hello" * true` will simply refuse to compile. This can make debugging significantly easier!

Some examples of types we'll be using are

* `int` positive and negative integers
* `bool` true and false
* `string` things like `"hello!"`

However, the beauty of OCaml's type system means we don't have to explicitly declare types! It will infer them from what we type in.

## Evaluating expressions in the toplevel

To play around with this, we'll experiment in the OCaml toplevel. Bring it up by typing `ocaml` or `utop` into your terminal. We can now evaluate expressions, terminated by a double semicolon (;;)

```ocaml
1 ;;
- : int = 1
4 + 4 ;;
- : int = 8
```

The expression that appears after we enter something in the toplevel is called the *type signature* - it represents the type of what we have just given OCaml. You can see that OCaml has correctly deduced that these are integers. Strings and booleans work in the same way. String concatenation is performed with `^`.

```ocaml
"hello" ^ " world!" ;;
- : string = "hello world!" 
true && false ;;
- : bool = false
```

Again, OCaml has worked out we are dealing with strings and booleans.

## Let bindings

These expressions we've typed in do not persist - we need a way to assign them to variables. Fortunately, we have let bindings, the OCaml way of saying variable assignment:

```ocaml
let greeting = "hello!"
val greeting : string = "hello"

let zero = 0
val zero : int = 0
```

The type signatures now contain the name of the variable in addition to the type data from before! We can recall these variables in the toplevel by typing their names.

```ocaml
greeting
val greeting : string = "hello"

zero 
val zero : int = 0
```

You can also use the `in` keyword to perform multiple operations in one defintion sequentially.

```ocaml
let calculation =
    let x = 2 + 1 in
        x * 2
val calculation : int = 6

calculation
val calculation : int = 6
```

## Functions

Of course variables aren't very fun on their own, we want to make functions that do things based on their arguments! Defining functions is very similar to defining variables.

```ocaml
let greet name = "hello " ^ name
val greet : string -> string = <fun>
```

Note that the type signature is a little bit different to what we're used to now! Let's break it down. On the left hand side, we have `string -> string`, which indicates that our function takes a string, and produces another string. The `<fun>` on the right hand side indicates that we have created a function - it cannot be reduced down to a value until we pass it some argument. 

To use our function, we simply place our arguments after the name of the function.

```ocaml
greet "George"
- : string = "hello George"
```

Now that we have given the function a string, OCaml has been able to reduce it down to just a string.

Functions can of course have multiple arguments too:

```ocaml
let formal firstname lastname = "good morning " ^ firstname ^ " " ^ lastname
val formal : string -> string -> string = <fun>
```

We can see that our type signature now indicates that *two* strings must be given as arguments in order to produce the string output.

```ocaml
formal "George" "Kaye"
- : string = "good morning George Kaye"
```

What if we only apply this function to one of its arguments? Will it break everything?

```ocaml
formal "George"
- : string -> string = <fun>
```

Nope, we've just created another function! This is called a *partial evaluation* of a function. In essence, we have created an optimised version of the original `formal` function that can only be used for people with the name `George` (a fantastic name!). Partial evaluations are used all the time under the hood in compilers.

In fact, rather than thinking about type signatures as a load of arguments and one single output, we can split the type signature at any point and provide some of the arguments, and get a function whose type signature is anything left over.

### Higher order functions and polymorphism

We can even take functions as arguments to functions! This is called a *higher order function*. Let's create a function that takes a function as an argument, and applies 2 to it.

```ocaml
let apply2 f = f 2
val apply2 : (int -> 'a) -> 'a = <fun>
```

Where did these `'a` types come from? We've not seen them before! These are *polymorphic types*, which means they can be *anything* and the function will still work! All that is constrained by our definition is that the function `f` must accept an `int` as an argument, since we have applied it to `2`. What it does then doesn't matter to the compiler.

However as we apply our arguments, the type signature will change depending on what we have given it. For example, let's define a function that adds two to its argument.

```ocaml
let add2 x = x + 2
val add2 : int -> int = <fun>
```

This function has type signature `int -> int`, which fits the pattern `int -> a` in the type signature of `apply2`. However, this means that the other `'a` in the function must also change to an `int` to follow suit. Let's see it in action:

```ocaml
apply2 add2
- : int = 4
```

As we would expect, we have got an `int`.

Let's go even more general. Here is a function that applies a function twice:

```ocaml
let twice f x = f (f x)
val twice : ('a -> 'a) -> 'a -> 'a = <fun>
```

Now everything is an `'a`! Like last time, we can find functions and variables that fit the polymorphic pattern to make this function more concrete. Our `add2` function also fits the pattern `'a -> 'a`, since both its argument and its output are the same type. This also means that all the `'a` types in the function must become `int` so the function doesn't fall apart. Let's partially apply the `twice` function.

```ocaml
twice add2
- : int -> int = <fun>
```

We can see that the remainder of the type signature, the `'a -> 'a`, has changed into an `int -> int` to suit the types we have given.

### Anonymous functions

Finally, we can create *anonymous functions* (also known as *lambda expressions*). These are functions that do not have a name, that we define on the spot to be used once. For example, rather than explicitly defining the `add2` function, we could have used an anonymous function:

```ocaml
apply2 (fun x -> x + 2)
- : int = 4
```

Think of `fun x -> x + 2` as a function that takes one argument `x`, and inserts it into the function on the other side of the arrow. 

Anonymous functions can be very useful when working with higher order functions, as it saves us having to explicitly define trivial operations like adding two to something.
