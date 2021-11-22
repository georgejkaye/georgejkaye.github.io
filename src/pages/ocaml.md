---
layout: default
title: Intro to Ocaml
subtitle: An introduction to a functional language
permalink: /ocaml/
---

So you want to learn Ocaml? Great - you're already on your way to joining the elite crowd that understand this fantastic language. Here you'll find a very basic tutorial to get you up and running with the language and its foibles.

## Installing OCaml

You will need:

* **[OPAM](https://opam.ocaml.org/doc/Install.html)**
* **[OCaml](https://ocaml.org/docs/install.html)**

You can then open the OCaml toplevel with `ocaml`. Alternatively (and I would recommend it!) you can install **UTop** with `opam install utop`, which gives you a much nicer command line interface by typing `utop` into the terminal.

There are various plugins for various text editors floating around. There is (of course) an Emacs mode: you will need **[Tuareg](https://github.com/ocaml/tuareg)** for running OCaml within Emacs and **[Merlin](https://github.com/ocaml/merlin)** for context-sensitive completion. For people like me who use VS Code, there is [this extension](https://marketplace.visualstudio.com/items?itemName=freebroccolo.reasonml) - this also provides support for ReasonML, a language based off OCaml that compiles to Javascript!

### Windows

OCaml on Windows is a fickle beast! To avoid struggling around with dependencies, I would recommend you install the **[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)** and download Ubuntu from the Microsoft Store. This enables you to have a Linux environment within your Windows installation!

Once you have installed the subsystem and set it up as specified in the link above, you must open the terminal (press `Ctrl`+`Alt`+`T`) and run these commands:

* `sudo apt update`
* `sudo apt install make m4 opam ocaml`
* `opam install utop ocamlbuild`

You will be prompted to input the password you created when installing the Linux Subsystem. During installation you may receive additional prompts for input - you should generally type 'y' (for yes).

You should now be able to access the OCaml toplevel in the terminal with `utop`, as above.

### Running OCaml

A majority of the code in this tutorial can be run in the *OCaml toplevel*. You can access this by typing `ocaml` or `utop` (if it's installed). You can type things directly into the toplevel or paste functions from your text editor. If you keep your code in a file, you can type `#use file.ml` into the toplevel and the entire contents of the file will be pasted in (providing it all compiles!).

When you actually want to compile a file to an executable, you should use the command `ocamlbuild -use-ocamlfind file.native`. OCamlfind is a very powerful tool that will automatically resolve dependencies for you, regardless of how many modules you use! More on modules later.

## A statically typed language

[OCaml](https://ocaml.org/) is a functional programming language, It is statically typed, so everything has a distinct type (unlike dynamically typed programming languages like Python, where you can mash pretty much anything together without the compiler complaining). The advantage of statically typed languages is that more errors are caught at *compile-time* rather than *run-time*. For example, something like `"hello" * true` will simply refuse to compile. This can make debugging significantly easier!

Some examples of types we'll be using are

* `int` positive and negative integers
* `bool` true and false
* `string` things like `"hello!"`

However, the beauty of OCaml's type system means we don't have to explicitly declare types! It will infer them from what we type in.

## Evaluating expressions in the toplevel

To play around with this, we'll experiment in the OCaml toplevel. Bring it up by typing `ocaml` or `utop` into your terminal.  We can now evaluate expressions, terminated by a double semicolon `;;`. In this tutorial, any line that can be entered into the toplevel will be prefixed with a `#`.

```ocaml
# 1
- : int = 1
# 4 + 4
- : int = 8
```

The expression that appears after we enter something in the toplevel is called the *type signature* - it represents the type of what we have just given OCaml. You can see that OCaml has correctly deduced that these are integers. Strings and booleans work in the same way. String concatenation is performed with `^`.

```ocaml
# "hello" ^ " world!"
- : string = "hello world!" 
# true && false
- : bool = false
```

Again, OCaml has worked out we are dealing with strings and booleans.

## Let bindings

These expressions we've typed in do not persist - we need a way to assign them to variables. Fortunately, we have let bindings, the OCaml way of saying variable assignment:

```ocaml
# let greeting = "hello!"
val greeting : string = "hello"

# let zero = 0
val zero : int = 0
```

The type signatures now contain the name of the variable in addition to the type data from before! We can recall these variables in the toplevel by typing their names.

```ocaml
# greeting
val greeting : string = "hello"

# zero 
val zero : int = 0
```

You can also use the `in` keyword to perform multiple operations in one defintion sequentially.

```ocaml
# let calculation =
    let x = 2 + 1 in
        x * 2
val calculation : int = 6

# calculation
val calculation : int = 6
```

## Functions

Of course variables aren't very fun on their own, we want to make functions that do things based on their arguments! Defining functions is very similar to defining variables.

```ocaml
# let greet name = "hello " ^ name
val greet : string -> string = <fun>
```

Note that the type signature is a little bit different to what we're used to now! Let's break it down. On the left hand side, we have `string -> string`, which indicates that our function takes a string, and produces another string. The `<fun>` on the right hand side indicates that we have created a function - it cannot be reduced down to a value until we pass it some argument. 

To use our function, we simply place our arguments after the name of the function.

```ocaml
# greet "George"
- : string = "hello George"
```

Now that we have given the function a string, OCaml has been able to reduce it down to just a string.

Functions can of course have multiple arguments too:

```ocaml
# let formal firstname lastname = "good morning " ^ firstname ^ " " ^ lastname
val formal : string -> string -> string = <fun>
```

We can see that our type signature now indicates that *two* strings must be given as arguments in order to produce the string output.

```ocaml
# formal "George" "Kaye"
- : string = "good morning George Kaye"
```

What if we only apply this function to one of its arguments? Will it break everything?

```ocaml
# formal "George"
- : string -> string = <fun>
```

Nope, we've just created another function! This is called a *partial evaluation* of a function. In essence, we have created an optimised version of the original `formal` function that can only be used for people with the name `George` (a fantastic name!). Partial evaluations are used all the time under the hood in compilers.

In fact, rather than thinking about type signatures as a load of arguments and one single output, we can split the type signature at any point and provide some of the arguments, and get a function whose type signature is anything left over.

## If statements and pattern matching

A key programming concept is changing program flow with if statements, and of course OCaml is no exception:

```ocaml
# let yesorno yes = if yes then "yes!" else "no..."
val yesorno : bool -> string = <fun>
```

Note that OCaml has, as always, deduced that `yes` must be a boolean because we are using it as a condition in our if statement. However, if statements can get a bit unwieldy, especially if we start chaining them together. Instead, it can be more elegant to use *pattern matching*!

```ocaml
# let yesorno' yes = match yes with
| true  -> "yes!"
| false -> "no..."
val yesorno' : bool -> string = <fun>
```

The behaviour and type signature of the function haven't changed, but the possible values of `yes` are now laid out a lot more neatly. You can see it's very similar to a switch statement in other languages. Another thing we can do to make our function slightly more concise is to drop the `match x with` if we are pattern matching on the final argument:

```ocaml
# let yesorno'' = function
| true  -> "yes!"
| false -> "no..."
val yesorno'': bool -> string = <fun>
```

You of course are not restricted to pattern matching with booleans! But most types have far more possible cases than the two booleans. Writing out all the possible cases would take a very long time, so we can use *wildcard* cases to catch anything we haven't already pattern matched on.

```ocaml
# let is_zero = function
| 0 -> true
| n -> false
val is_zero = int -> bool = <fun>
```

If we feed this function `0`, it will return true, but any other number will reach the `n` case and therefore return false. This means that every element of `int` will still be mapped to an output, making this a *total function*. What if we skip some cases?

```ocaml
# let binary = function
| 0 -> false
| 1 -> true
Characters 14-14:
Warning 8: this pattern matching is not exhaustive.
Here is an example of a case that is not matched:
2
val binary : int -> bool = <fun>
```

OCaml is clever enough to realise that our pattern matching is not *exhaustive* - there are cases (such as `2`) that do not have a mapping and will cause an error if we try to input them. Let's do it anyway!

```ocaml
binary 2;;
Exception: Match_failure ("//toplevel//", 1, 14)
```

Predictably, we have received an exception. But what if we only want to define this function for those arguments and fail with a message saying so? Fortunately this isn't hard to implement.

```ocaml
# let binary = function
| 0 -> false
| 1 -> true
| _ -> failwith "binary: invalid argument"
val binary : int -> bool = <fun>
```

The underscore means that we don't care about the value of the argument, only that we want anything that has not been matched yet to follow this case. OCaml doesn't complain that our pattern matching isn't exhaustive any more! However you should be careful when doing this, since it can hide away bugs caused by non-exhaustive pattern matching.

We can match on multiple arguments too:

```ocaml
# let or_gate x y = match (x, y) with
| (true, true)   -> true
| (true, false)  -> true
| (false, true)  -> true
| (false, false) -> false
val or_gate : bool -> bool -> bool = <fun>
```

This isn't the most efficient way we can implement this though, since we know that any pair of arguments that has at least one true will return true. If we use the underscore wildcard again we can save ourself a case:

```ocaml
# let or_gate x y = match (x, y) with
| (true,_) -> true
| (_,true) -> true
| (_,_)    -> false
val or_gate : bool -> bool -> bool = <fun>
```

An important thing to note with these functions is that even though we are changing the program flow based on the inputs, the type signature is always the same. A function of type `int -> int` must *always* return an `int`. It cannot return an `int` for some values and `bool` for others!

## Recursion

One of the most powerful mechanics in OCaml is *recursion*, which allows us to call functions from inside themselves! It is the functional parallel to *iteration* in imperative languages (e.g. using for loops). A classic example of a recursive function is the factorial function n! = n * n-1 * ... * 1.

```ocaml
# let rec factorial = function
| 0 -> 1
| n -> factorial (n - 1) * n
val factorial : int -> int
```

What is this function saying? It matches an `int` against two cases. If it is equal to zero, we return 1, as 0! = 1. If it is any other value, we use the fact that n! = (n-1!) * n. We call `factorial (n-1)` to work out what (n-1)! is, then we multiply it by n to get n!. 

Also note the `rec` keyword at the start of the function. This indicates to OCaml that we will be using this function again inside its definition, so it needs to keep track of it. Otherwise we will just receive a `Unbound value` error.

Another example of a recursive function is a function that computes the maximum of two positive numbers recursively, by using the fact that if one number is equal to zero, the other must either be greater or equal to it.

```ocaml
# let rec max x y = match (x, y) with
| (0, y) -> y
| (x, 0) -> x
| (x, y) -> max (x-1) (y-1) + 1
val max : int -> int -> int
```

Obviously don't call this function with negative numbers otherwise you might be here some time.

## Polymorphism

Let's look at some different kinds of functions. What about a function that simply returns whatever you give it? This is called the *identity* function and while it may seem pointless, it can be useful when reasoning about programs.

```ocaml
# let id x = x
val id : 'a -> 'a = <fun>
```

Where did these `'a` types come from? We've not seen them before! These are *polymorphic types*, which means they can be *anything* and the function will still work! After all, a function that returns its argument will not run any differently whether we give it an `int`, a `bool`, a `string`, or anything else! OCaml will automatically work this out and use these special types with a `'` character before them to show that they are polymorphic. We don't have to stick to just `'a` either, take a look at this function that returns the first one of its arguments:

```ocaml
# let first x y = x
val first : 'a -> 'b -> 'a
```

We know that the output of the function must be the same type as its input, so both of these are `'a`. However the second argument's type is completely irrelevant. We can't just call it `'a` as well because that would restrict it to being the same type as the first argument, which we know isn't necessarily the case. So we use a different polymorphic type `'b`.

## Data structures

We can do a lot with our basic types. But to do more interesting things we need to use *data structures*, several of which are built into OCaml. Let's look at a few of them.

### Tuples

Tuples can be used to contain any number of arbitrary data types, which can be useful when we want to return multiple things at once from a function. We have already seen 2-tuples, or pairs, when pattern matching on multiple arguments!

```ocaml
# let pair = (3,true)
val pair : int * bool = (3, true)
# let triple = ("hello", 46, false)
val triple : string * int * bool = ("hello", 46, false)
```

A tuple's type signature shows the types contained within separated by the `*` symbol. Their length is fixed in their type signature - functions cannot return arbitrary tuples but must always return a pair, or a triple, and so on.

You can pattern match on tuples to access their elements:

```ocaml
# let swap = function
| (x, y) -> (y, x)
val swap = 'a * 'b -> 'b * 'a
```

OCaml can use type inference to deduce the types inside a tuple, even if it can't deduce them all. For example, this function that selects either the second or third element of the triple depending on the first restricts its first element to `bool`, and since functions must always return the same type, the second and third elements must also be the same type.

```ocaml
# let select = function
| (true, x, _)  -> x
| (false, _, y) -> y
val select : bool * 'a * 'a -> 'a = <fun>
```

You might be thinking that this looks very similar to just using n arguments for a function, and indeed it is! A function taking an n-tuple as an argument is *isomorphic* to a function taking n arguments, which means we can switch between them without losing any data. Changing a function that takes a tuple as an argument into one that takes multiple arguments is called *currying*, after [Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry).

```ocaml
# let swap_curried x y = match (x, y) with
| (x, y) -> (y, x)
val swap_curried : 'a -> 'b -> 'b * 'a = <fun>
```

### Lists

Lists are another data type that are used very frequently in OCaml. They are similar to arrays, with a key difference. In arrays, you can access any element in one operation. In lists, you can only access the first element (called the *head* of the list), and the 'rest' of the list as a sublist (called the *tail*). Lists can either be empty or take the structure `x :: xs`, where `x` is the head and `xs` is the tail. In the `numbers` example, `1` is the head and `[2;3;4;5]` is the tail.

```ocaml
# let empty = []
val empty : 'a list = []
# let singleton = [true]
val singleton : bool list = [true]
# let numbers = [1;2;3;4;5]
val numbers : int list = [1;2;3;4;5]
```

List concatenation is performed with the `@` operator.

```ocaml
# let biglist = [1;2] @ [3;4]
val biglist : int list = [1;2;3;4]
```

We can pattern match on lists based on whether they are empty or of the form `x :: xs`. For example, we can write functions that extract the head or the tail of a list, keeping in mind that these operations will fail on an empty list:

```ocaml
# let head = function
| []        -> failwith "empty list"
| (x :: xs) -> x
val head : 'a list -> 'a = <fun>

# let tail = function
| []        -> failwith "empty list"
| (x :: xs) -> xs
val tail : 'a list -> 'a list = <fun>
```

Note that the head of the list is just an element of type `'a`, whereas the tail of a list is another list `'a list`.

A common operation on lists is to find their length, which we can do recursively. An empty list has length 0, and other lists have length 1 + the length of their tail.

```ocaml
# let rec length = function
| []        -> 0
| (x :: xs) -> 1 + length xs
val length : 'a list -> int = <fun>
```

### Binary trees

Both tuples and lists are built into OCaml by default. We'll now look at how to define a slightly more advanced data structure, called *binary trees*. A binary tree has nodes, which must have two children (hence the binary part of their name), and leaves, which have no children. The node at the 'bottom' of the tree is called the *root*.

```
        .   <-- root of the tree
       / \
      .   .   <-- nodes
     / \ / \
    4  1 5  7   <-- leaves
```

How do we define these in OCaml? We can use the `type` syntax.

```ocaml
# type intTree =
| Leaf of int
| Node of intTree * intTree
type intTree = Leaf of int | Node of intTree * intTree
```

This type definition means that an intTree can be either a `Leaf` containing an `int` OR a `Node` containing a pair of `intTree`s (note the `*` we saw earlier indicating a tuple). Because the definition of a `Node` contains more `intTrees`, this is a recursive data structure, like lists.

```ocaml
# let leaf = Leaf 5
val leaf : intTree = Leaf 5;;
# let tree = Node (Node (Leaf 4, Leaf 1), Node (Leaf 5, Leaf 7))
val tree : intTree = Node (Node (Leaf 4, Leaf 1), Node (Leaf 5, Leaf 7))
```

As with lists, we can easily do pattern matching on our new data structure:

```ocaml
# let is_leaf = function
| Leaf x              -> true
| Node (left, right)  -> false
val is_leaf : intTree -> bool = <fun>
```

An useful operation on binary trees is to *traverse* them and collect any leaves we encounter in a list. We're going to need recursion again!

```ocaml
# let rec traverse = function
| Leaf x             -> [x] 
| Node (left, right) -> (traverse left) @ (traverse right)
val traverse : intTree -> int list = <fun>
```

If this function is given a leaf, it creates a single-element list with that element in it. If it is given a node, it must traverse the left and right subtrees and find all the elements. Then it has to concatenate these two lists together.

Another property of trees is their *height*. It is defined as the longest path from the root of a tree to a leaf. So the height of a leaf is 0 since no path is required, and the height of a node is 1 (for the current node) + the height of its tallest subtree.

```ocaml
# let rec height = function
| Leaf x             -> 0
| Node (left, right) -> 1 + max (height left) (height right)
val height : intTree -> int = <fun>
```

We don't even have to restrict ourselves to trees of `int`s. Remember our polymorphic types `'a` and so on? We can use them to define polymorphic data structures.

```ocaml
type 'a tree =
| Leaf of 'a
| Node of 'a tree * 'a tree
type 'a tree = Leaf of 'a | Node of 'a tree * 'a tree
```

Now we can define trees of whatever type we like!

```ocaml
# let bools = Node (Leaf true, Node (Leaf false, Leaf false))
val bools : bool tree = Node (Leaf true, Node (Leaf false, Leaf false))
# let strings = Node (Node (Leaf "OCaml", Leaf "is"), Leaf "great!")
val strings : string tree = Node (Node (Leaf "OCaml", Leaf "is"), Leaf "great!")
```

If we redefine our functions from earlier we can see that OCaml works out that our `'a tree` definition is more general so it uses it in the type signature.

```ocaml
# let rec traverse = function
| Leaf x             -> [x] 
| Node (left, right) -> (traverse left) @ (traverse right)
val traverse : 'a tree -> 'a list = <fun>

# traverse strings
- : string list = ["OCaml"; "is"; "great!"]
```

## Higher order functions

Let's go back to functions for a little bit. When defining functions, we don't actually need to restrict ourselves to things like `int` or `string`. We can actually take functions as arguments too! A function that does this is called a *higher order function*. Let's create a function that takes a function as an argument, and applies it twice to some other argument.

```ocaml
# let twice f x = f (f x)
val apply2 : ('a -> 'a) -> 'a = <fun>
```

Our polymorphic types have returned. We can see that the first argument to our function is `('a -> 'a)`, a function type that takes an argument of type `'a` and returns something of that same type. Why does the output have to be the same type as the input? Since we are applying the function twice, whatever comes out of it must also be able to go back into it, otherwise the function wouldn't work! The second argument is of type `'a`, which also makes sense since we need to feed it to our function.

Let's create a function that fits the pattern `('a -> 'a)` and partially apply the `twice` function.

```ocaml
# let add2 x = x + 2
val add2 : int -> int = <fun>

twice add2
- : int -> int = <fun>
```

We can see that the remainder of the type signature, the `'a -> 'a`, has changed into an `int -> int` to suit the types we have given.

### Anonymous functions

When dealing with higher order functions, it can be tiresome to have to separately define functions to pass to other functions, especially if they are only used once. To save ourselves time, we can use *anonymous functions* (also known as *lambda expressions*) that we can pass directly to the function. These are functions that do not have a name, that we define on the spot to be used once. For example, rather than explicitly defining the `add2` function, we could have used an anonymous function:

```ocaml
twice (fun x -> x + 2)
- : int -> int = <fun>
```

Think of `fun x -> x + 2` as a function that takes one argument `x`, and inserts it into the function on the other side of the arrow.
