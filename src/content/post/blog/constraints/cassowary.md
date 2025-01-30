---
title: Cassowary Layout Algorithm
datePublished: 13 January 2025
summary: An incremental linear program solver for user interface layout.
tags: [constraints, optimization, layout]
tools: [rust]
---

In this post, we will walk through the design of a constrain-based layout engine based on the Cassowary [@badros2001:cassowary] incremental linear program solver.

# Paper Notes

Linear equality and inequality constraints arise naturally in specifying many aspects of user interfaces, such as:

* one window should be to the left of another
* a pane occupy the leftmost third of a window
* one rectangle should be wholly contained inside another
* "inside", "left-of", "above", "below", "overlaps", etc.

Cassowary is an incremental algorithm based on the dual simplex method for solving linear programs, which can efficiently solve linear equality and inequality constraints simultaneously.

When evaluating different solvers for layout purposes, we care not just about efficiency, but also:

* **Preferences vs. Requirements**.  Some constraints (such as one binding the position of an object to the user's mouse) have lower priority than others (such as all objects staying within their bounds.)
* **Stability.** When layout elements move, other elements should remain where they are unless there is some reason for them to move (i.e. another constraint requires so).
* **Handling Invalid Inputs.** If a user drags an object to the edge of its containing window, the object should not move beyond the edge.
* **User Interactions** are modeled as **edit constraints** equating the positions of the mouse and an object.

Many real-world layout problems have _constraint cycles_ and Cassowary is capable of handling these as well.  Cycles sometimes arise when the programmer added redundant constraints -- the cycles _could have_ been avoided by careful analysis -- but the redundancy eases the burden on the programmer.

Cassowary labels each constraint with a **strength** from $\{ 0, 1, 2, \dots \}$.  The strength $0$ indicates a **required** constraint, while the nonzero integers indicate successive degrees of non-requiredness.

* Cassowary will always solve stronger constraints before weaker ones.  0-strength will be solved before 1-strength, and so on.

Cassowary operates on a finite number of constraints $(c_n, s_n)$ each labeled by their strength $s_n$.  The constraints refer to a finite number of variables $(x_1, \dots, x_m)$.  The solution to a constraint problem is a **valuation** which assigns a value to all variables,

$$
\left\{ \begin{array}{c} x_1 &\mapsto& 3 \\ x_2 &\mapsto& -1 \\ \vdots&&\vdots \\ x_m &\mapsto& 5 \end{array} \right\}
$$

Denote by $S_0 \subset \R^m$ the set of valuations satisfying all of the required constraints.  We define the **solution set** $S$ to be:

$$
S = \{ 
  \theta \in S_0
  \mid
  \forall \sigma \in S_0, \neg \mathrm{better}(\sigma, \theta, H)
\}
$$

The $\mathrm{better}$ comparator will be a way of scoring multiple valuations which all satisfy the required constraints.  Our error function will be the $\ell_1$ norm of the error margin.  Define an error tuple, each element corresponding to one of finitely many strengths:

$$
\mathrm{err}(\theta) =
\left[
  \sum_{c \in H_1} \mathrm{err}(c\theta),
  \dots,
  \sum_{c \in H_n} \mathrm{err}(c\theta)
\right]
$$

One valuation is $\mathrm{better}$ than another if its corresponding tuple of errors is lexicographically smaller.

## Adapting the Simplex Algorithm

Challenges

* The standard simplex algorithm works for linear objective functions, but our weighted-sum-better scoring function is non-linear.  The Cassowary solver uses a _quasi-linear_ approximation to the scoring function defined above.
* We desire an **incremental** solver, to avoid expensive re-computation of solutions when the user is interactively editing constraints.

Conversion to and from Standard Form

1. the user is allowed to specify constraints on _unrestricted_ variables (any real value)
2. internally we work only with _restricted_ variables (nonnegative) by introducing slack variables
3. 

```bibtex
@article{@badros2001:cassowary,
  title={The Cassowary linear arithmetic constraint solving algorithm},
  author={Badros, Greg J and Borning, Alan and Stuckey, Peter J},
  journal={ACM Transactions on Computer-Human Interaction (TOCHI)},
  volume={8},
  number={4},
  pages={267--306},
  year={2001},
  publisher={ACM New York, NY, USA},
  url={https://constraints.cs.washington.edu/solvers/cassowary-tochi.pdf}
}
```