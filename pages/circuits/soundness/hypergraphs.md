---
layout: page2
title: Circuits • Hypergraphs
permalink: /circuits/soundness/hypergraphs
type: project
---

The vertices and edges of our hypergraph are contained within some
global, countably infinite set $\mathcal{A}$ of atoms.

{% raw %}

**Definition 1** (Hypergraph)
{: .definition-header }

Let a hypergraph with $m$ inputs and $n$ outputs comprise of

- Two finite sets $V^{\mathcal{T}}\subset \mathcal{A}$ (target) and
    $V^{\mathcal{S}}\subset \mathcal{A}$ (source) of vertices
  - such that $|V^{\mathcal{T}}| = |V^{\mathcal{S}}|$ and
        $V^{\mathcal{T}}\cap V^{\mathcal{S}}= \emptyset$
  - equipped with total orders ${\leq^{\mathcal{T}}}$ and
        ${\leq^{\mathcal{S}}}$ respectively.
  - A finite set $E \subset \mathcal{A}$ of edges and two extra edges
    $\alpha$ (input) and $\omega$ (output), $\alpha, \omega\not\in E$
- Two functions
  - $\lambda$ (left) $: V^{\mathcal{T}} \to E \uplus \{\alpha\}$
    - with its inverse image $\mathsf{t}$ (targets) $: E \uplus \{\alpha\} \to \mathcal{P}^{{\leq^{\mathcal{T}}}}(V^{\mathcal{T}})$
    - such that $\|\mathsf{t}(\alpha)\| = m$
  - $\rho$ (right) $: V^{\mathcal{S}} \to E \uplus \{\omega\}$
    - with its inverse image $\mathsf{s}$ (sources) $: E \uplus \{\omega\} \to \mathcal{P}^{{\leq^{\mathcal{S}}}}(V^{\mathcal{S}})$
    - such that $\|\mathsf{s}(\omega)\| = n$
- A bijective function $\kappa$ (connections) $: V^{\mathcal{T}} \to V^{\mathcal{S}}$
- A finite set of labels $L$ and a labelling function $\Lambda$ (labels) $: E \to L$
  - such that $\forall e_1, e_2 \in E$, if $\Lambda(e_1) = \Lambda(e_2)$ then
    - $\|\mathsf{s}(e_1)\| = \|\mathsf{s}(e_2)\|$
    - $\|\mathsf{t}(e_1)\| = \|\mathsf{t}(e_2)\|$
{: .definition-body-bullets}

{% endraw %}

For a hypergraph with $m$ inputs and $n$ outputs, we write it as
$f : m \to n$, where $m \to n$ is the *type* of the hypergraph. The pair
of sources and targets of an edge $(\mathsf{s}(e), \mathsf{t}(e))$ is
referred to as its *interface* -- if a vertex is a member of either of
these sets we say that it is *incident* on edge $e$. The input and
output edge $\alpha$ and $\omega$ are 'special' edges that all
hypergraphs have -- they collect the 'dangling' vertices on the left and
the right edges of the hypergraph. Subsequently $\mathsf{t}(\alpha)$ and
$\mathsf{s}(\omega)$ can be thought of as the input and output 'ports'
of the entire hypergraph. We sometimes refer to the elements of the set
$E$ as the *regular edges* of the hypergraph.

The following is an example of a hypergraph, representing a flip-flop.
The label ${\downarrow}$ represents a NOR gate and $\curlywedge$
represents the forking of a wire.

**Example 2:** (Flip-flop)
{: .definition-header}

{% raw %}
$$V^I = V^O = \{ v_{0},v_{1},v_{2},v_{3},v_{4},v_{5},v_{6},v_{7}\}$$$$E = \{ e_{0},e_{1},e_{2},e_{3} \}$$$$\lambda = \{v_{0} \mapsto \alpha,v_{1} \mapsto \alpha,v_{2} \mapsto e_{0},v_{3} \mapsto e_{1},v_{4} \mapsto e_{1},v_{5} \mapsto e_{2},v_{6} \mapsto e_{3},v_{7} \mapsto e_{3}\}$$$$\rho = \{v_{0} \mapsto e_{0},v_{1} \mapsto e_{0},v_{2} \mapsto e_{1},v_{3} \mapsto e_{2},v_{4} \mapsto e_{2},v_{5} \mapsto e_{3},v_{6} \mapsto \omega,v_{7} \mapsto \omega\}$$$$\kappa = \{v_{0} \mapsto v_{0},v_{1} \mapsto v_{4},v_{2} \mapsto v_{2},v_{3} \mapsto v_{6},v_{4} \mapsto v_{3},v_{5} \mapsto v_{5},v_{6} \mapsto v_{1},v_{7} \mapsto v_{7}\}$$$$L = \{\downarrow, \curlywedge\}$$$$\Lambda= \{e_{0} \mapsto \downarrow,e_{1} \mapsto \curlywedge,e_{2} \mapsto \downarrow,e_{3} \mapsto \curlywedge\}$$$$\mathsf{s}= \{e_{0}\mapsto \{{v_{0}, v_{1}}\},e_{1}\mapsto \{{v_{2}}\},e_{2}\mapsto \{{v_{3}, v_{4}}\},e_{3}\mapsto \{{v_{5}}\},\omega\mapsto \{{v_{6}, v_{7}}\}\}$$$$\mathsf{t}= \{\alpha\mapsto \{{v_{0}, v_{1}}\},e_{0}\mapsto \{{v_{2}}\},e_{1}\mapsto \{{v_{3}, v_{4}}\},e_{2}\mapsto \{{v_{5}}\},e_{3}\mapsto \{{v_{6}, v_{7}}\}\}$$
{: .definition-body}
{% endraw %}

This example can be seen graphically in Figure
[\[fig:flipflop\]](#fig:flipflop){reference-type="ref"
reference="fig:flipflop"}, drawn both in an informal and formal style.
Informally the left and right maps are represented by wires from the
left and right of the vertices, and the connections map is represented
by these vertices sharing a point. When drawing hypergraphs formally, we
stack the vertices up according to their order, with source vertices on
the left and the target vertices on the right. In our notation we label
vertices with a natural number, so the ordering is the ordering of the
natural numbers. The edges are also stacked, although this order is
irrelevant. The left ($\lambda$) and right ($\rho$) maps are drawn as
arrows pointing left or right appropriately. For clarity, the
connections ($\kappa$) map will generally be written shorthand as an
arrow and the vertex number, rather than cluttering up the graph with
many arrows.

![Flip-flop](/images/circuits/soundness/flipflop-circuit.svg)
![Informal hypergraph](/images/circuits/soundness/example-main-informal.svg)
![Formal hypergraph](/images/circuits/soundness/example-main-formal.svg)