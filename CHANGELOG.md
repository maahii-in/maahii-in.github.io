# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

Work in progress on the `dev` branch. Nothing here is live on [maahii.space](https://maahii.space) until `dev` is merged into `main`.

### Added
- `dev` branch for day-to-day work, so the live site on `main` stays stable
- "Branching and Releases" section in the README, with the pull-request workflow and release steps
- Release badge and a link to this changelog in the README

### Changed
- Architecture diagram in the README now shows the `dev` to `main` flow

### Planned
- Real certificate images in place of the generated placeholders
- Project screenshots and live-demo links
- Blog section for write-ups on RAG and LLM engineering
- Case study page for each featured project
- Contact form that delivers messages straight to my inbox

## [1.0.0] - 2026-10-15

First public release of the portfolio at [maahii.space](https://maahii.space).

### Added
- Portfolio content built from my resume: hero, skills, experience, projects, education, certifications and contact sections
- Name animation and typewriter roles (AI Engineer, LLM Developer, RAG Systems Builder, ML Enthusiast)
- Skills grouped into Languages and Databases, AI and LLM, Machine Learning, and MLOps and Tools, with a matching logo strip
- Experience section for the AI Engineer role at XaasIO Pvt Ltd
- Three featured projects with GitHub links
- Profile photo in the hero
- Resume download (`public/documents/resume.pdf`)
- Contact form that opens the visitor's email app with the message pre-filled
- Location set to Chirala, Andhra Pradesh, India, with a matching map
- SEO: meta description, canonical URL, Open Graph tags, `Person` structured data, `robots.txt` and `sitemap.xml`
- Google Search Console verification file
- Favicons and web manifest with my initials
- GitHub Actions workflow that builds and deploys to GitHub Pages on every push to `main`
- Custom domain `maahii.space` with HTTPS, using GoDaddy DNS
- Professional README with architecture diagram, setup, deployment and design notes

### Changed
- Replaced all personal data from the original template with my own: name, links, email, projects, education and certifications
- Removed the `baseUrl` option from `tsconfig.app.json` to fix the TypeScript deprecation warning
- Renamed the GitHub account username to `maahii-in` and updated every link

### Removed
- The AI chat assistant, the "My Services" button and the old contact-form API, which pointed at the template author's services
- The Internships section (replaced by Experience) and all of the template owner's images

### Known limitations
- Certificate images and project covers are generated placeholders
- Projects have no live demos
- Google indexing of the site was still in progress at release time

[Unreleased]: https://github.com/maahii-in/maahii-in.github.io/compare/v1.0.0...dev
[1.0.0]: https://github.com/maahii-in/maahii-in.github.io/releases/tag/v1.0.0
