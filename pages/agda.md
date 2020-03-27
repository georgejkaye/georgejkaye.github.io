---
layout: page2
title: Agda
permalink: /agda/
---

Hello this is an agda file!

```agda
module Agda where


data Nat : Set where
  zero : Nat
  succ : Nat


four : Nat
four = succ (succ (succ (succ zero)))
```

Hello again!
