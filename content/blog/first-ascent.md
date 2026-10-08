---
title: "My experience as a CS TA at UBC"
date: "2026-07-11"
description: "A short note on why this site exists and what I'll write about."
---

Last spring, I had the opportunity to TA for CPSC 110, an introductory computer science course at UBC. The application process was straightforward: I applied online with a recommendation from my lab TA, Sean, along with a personal statement explaining why I wanted to TA for the course. I listed CPSC 110 as my top choice, so I was thrilled when I received the offer.

## About CPSC 110

CPSC 110 is a required course for students majoring in Computer Science and related programs, such as BUCS and COGS. Across the 2025 Winter Terms 1 and 2, approximately 2,000 students were enrolled in the course across all sections.

The course introduces many fundamental computer science concepts using Racket, a functional programming language and a dialect of Lisp (interestingly, Waterloo's CS135 is another foundational CS course taught using Racket). Key concepts covered in the course include the How to Design Functions (HtDF) and How to Design Data (HtDD) design recipes, recursion, and parameterization.

What makes CPSC 110 particularly interesting is that it also introduces foundational algorithms and data structures, including graphs, binary search trees (BSTs), depth-first search (DFS), and breadth-first search (BFS). Many of these topics are revisited in greater depth in CPSC 221. The course also introduces higher-order functions such as foldr, map, and filter, concepts that reappear in CPSC 213 when discussing abstraction and functional programming.

## What TAing taught me about learning and teaching

### 1. Structure is what makes hard things learnable

One of the biggest things I took away from teaching is that students usually don't struggle because a concept is impossible. More often, they just don't know where to start. The design recipes showed me how much it helps to hand someone a clear process to follow instead of just showing them the answer - breaking a hard problem into smaller questions makes it feel manageable. I've started using the same approach in my own learning. When something feels overwhelming, I try to treat it almost like test-driven design: figure out what I'm trying to accomplish, break it into smaller pieces, and work through them one at a time.

![Handwritten iPad notes working through a search tree problem: two sketched trees, a make-stree example, and the skeleton of a fn-for-stree template](/blog/stree-sketch.jpg "Here's a sketch I used to break down a search tree problem visually - drawing the data first usually makes the template obvious.")

### 2. You understand something differently once you've seen people misunderstand it

Explaining recursion to one student is one thing. Explaining it to thirty students who are all confused in different ways is completely different. Teaching exposed gaps in my own understanding that doing well in the course never did. I had to think about why something worked, how to explain it from a few different angles, and where someone's reasoning might go off track. That experience made me realize that one of the best ways to understand something deeply is to teach it to someone else.

### 3. Teach ideas, not tools

One of the most common things I heard from students was, "Why are we learning Racket if nobody uses it in industry?" I understand where that comes from, but it also helped me see the bigger purpose of the course. The language itself isn't really the point. What matters is learning how to break down problems, design data, and build abstractions. Students might forget most of the Racket syntax after the course, but those ways of thinking carry over into other languages and problems. As a TA, I learned that good teaching is often about helping students see past the tool and understand the idea underneath it.
