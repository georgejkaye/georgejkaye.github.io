---
layout: page
title: Soundness
permalink: /circuits/soundness/notation
type: project
---

## Notation

For a totally ordered set $X$ we can write its order as $\torder{X}$. The $y$th element of a totally ordered set $X$ is denoted as $\proj{y} \circ X$. When considering two totally ordered sets $X$ and $Y$ with total orders $\torder{X}$ and $\torder{Y}$, we write as $\torder{X} \comborder \torder{Y}$ a total order on their disjoint union in which all elements of $X$ are less than elements in $Y$:

$$\{(x, y) | (x, y \in X \wedge x < y) \lor (x, y \in Y \wedge x < y) \lor (x \in X \wedge y \in Y)\}$$ 

For example if $X = \{\mf{a},\mf{b}\}$, $\torder{X} = \mf{a} < \mf{b}$ and $Y = \{\mf{c},\mf{d}\}$, $\torder{Y} = \mf{c} < \mf{d}$ then $X \comborder Y = \mf{a} < \mf{b} < \mf{c} < \mf{d}$.

We call a function $\morph{f}{X}{Y}$ *well-defined* if $\forall x \in X. \,\exists y \in Y. \, f(x) = y$. For a function $\morph{f}{X}{Y}$, we denote by $\morph{f^\*}{\powerset(X)}{\powerset(Y)}$ its pointwise application to each element in its input. When we have two functions $\morph{f}{X}{Y}$ and $\morph{g}{U}{V}$ where $X$ and $U$ are disjoint ($Y$ and $V$ do not necessarily have to be disjoint), we can define a function $\morph{f \djf g}{X' \uplus U'}{Y \cup V}$, where $X' \subseteq X$ and $U' \subseteq U$, which acts as $f$ on elements of $X'$ and $g$ on elements of $U'$. If the sets are not disjoint, we can instead *override* the first by defining a function $\morph{f \ndjf g}{X' \cup U'}{Y \cup V}$ such that

$$(f \oslash g)(x) = \begin{cases}
    f(x) & \text{if}\ x \not\in Y \\
    g(x) & \text{if}\ x \in Y
\end{cases}$$

A very common use for this notation is to combine two disjoint functions
$f : X \to Y$ and $g : U \to V$ and remap elements that also exist in
some other set $Z$ to a new value $\star$. To represent this function
$h : X \uplus U \to Y \cup V \uplus \{\star\}$ we would use the notation
$h(v) = (f \oplus g) \oslash \\{v \mapsto \star \,|\, v \in Z \\}$. This
function acts as $f$ or $g$ on elements of $X$ and $Y$ that do not exist
in $Z$. We can also use other predicates to remap elements that satisfy
some specific condition.

When using sequential ($\seq$) and parallel ($\tensor$) composition, $\tensor$ binds tighter than $\seq$, that is $f \tensor g \seq h \tensor k$ should be read as $(f \tensor g) \seq (h \tensor k)$. Equations should be read in diagrammatic order: sequential composition from left-to-right, parallel composition from top-to-bottom.

**Next:** [Hypergraphs](/circuits/soundness/hypergraphs)