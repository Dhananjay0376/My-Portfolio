# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
To build the ultimate "fan-making" portfolio website for a full-stack solution builder. It must be ultra-modern, cinematic, dark-first with electric accent colors. Every interaction should feel premium, using scroll-triggered animations, 3D elements, and particle systems to create an immersive experience that instantly converts visitors into clients.

## Goals
1. Deliver a visually stunning, dark-first UI with 60fps animations, WebGL canvas, and smooth interactions.
2. Showcase projects through immersive case studies featuring 3D tilts, live demos, and detailed metrics.
3. Integrate a personalized "Ask the Solution Builder" AI chatbot using RAG on personal content.
4. Achieve perfect Lighthouse scores (95+ all categories) with full SEO optimization.

## Non-Goals (Out of Scope)
- Light theme as default (dark is the premium default).
- Basic/flat aesthetic sections.
- Managing user accounts or a complex multi-vendor backend.

## Users
Potential clients, collaborators, and recruiters looking to hire a full-stack developer who builds complete solutions.

## Constraints
- Next.js 15 (App Router), React 19, TypeScript.
- Tailwind CSS + shadcn/ui + Framer Motion.
- React Three Fiber / Three.js for 3D elements.
- Vercel AI SDK + Supabase Vector for RAG.
- Must be instantly deployable to Vercel.

## Success Criteria
- [ ] 95+ Lighthouse score across all categories.
- [ ] Seamless 60fps animations and scroll transitions on mobile and desktop.
- [ ] Fully functional AI chatbot querying project/portfolio context via RAG.
- [ ] Completed sections: Hero, About Me, Projects, Expertise, Insights (MDX), Connect.
