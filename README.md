# Ellipsis Earth: concept redesign

An unofficial concept redesign of [ellipsis.earth](https://www.ellipsis.earth), built as a personal portfolio project. It is not affiliated with or endorsed by Ellipsis Earth Ltd. All content and photography belong to them.

## About Ellipsis Earth

Ellipsis Earth is a London-based environmental tech company founded in 2019. Its goal is to power informed decision-making by providing robust, comparable data on environmental pollution around the world.

The company works across three areas:

- **Earth (monitor):** machine-learning tools that detect, grade and predict litter from phone, drone and vehicle imagery. Councils, brands and governments use them to target interventions and measure what worked.
- **Educate (teach):** *Plastics, Data & Me*, a student-led citizen science programme where students collect real data with the same technology as Ellipsis scientists.
- **Stories (communicate):** campaigns, expeditions and journalism that turn the data into stories that change behaviour.

Their long-term ambition is an integrated ecosystem for environmental change, combining independent global research, disruptive education, exploration and creative media, all underpinned by one system for mapping the world's environmental impact.

## About this redesign

The original site is built on Wix. This concept rebuilds it as a fast, accessible static site with a "field notebook" visual identity. Earth, Educate and Stories are given equal weight, there is an interactive demo of the platform, and the Bournemouth case study is told as a scroll story.

## Tech

- [Astro](https://astro.build) with TypeScript
- React islands, used only for the interactive litter-map demo
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev) for animation
- Markdown content collections for the journal
- Deployed on [Vercel](https://vercel.com)

## Running locally

Requires Node.js 22.22 or later.

```sh
npm install
npm run dev
```
