# Changelog

All notable changes to this project are documented in this file.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Work in progress on the `dev` branch. Changes documented in this section are not yet live on [maahii.space](https://maahii.space). They will be included in the production website after `dev` is merged into `main`.

### Added
- Introduced a dedicated `dev` branch for day-to-day development, keeping the production `main` branch stable.
- Added a **Branching and Releases** section to the README, documenting the pull request workflow and release process.
- Added a release badge and a link to this changelog in the README.

### Changed
- Updated the README architecture diagram to illustrate the development-to-production workflow (`dev` → `main`).

### Planned
- Replace generated certificate placeholders with authentic certificate images.
- Add project screenshots and live demo links.
- Introduce a blog section featuring articles on Retrieval-Augmented Generation (RAG) and Large Language Model (LLM) engineering.
- Create dedicated case study pages for featured projects.
- Implement a functional contact form that delivers messages directly to the owner's inbox.

## [1.0.0] - 2026-10-15

**Initial public release** of the personal portfolio website at [maahii.space](https://maahii.space).

### Added
- Built a professional portfolio based on resume content, featuring an introduction, technical skills, professional experience, projects, education, certifications, and contact information.
- Implemented animated name text and a typewriter effect showcasing the roles of AI Engineer, LLM Developer, RAG Systems Builder, and ML Enthusiast.
- Organized technical skills into Languages and Databases, AI and LLM, Machine Learning, and MLOps and Tools, with a corresponding technology logo strip.
- Added professional experience for the AI Engineer role at XaasIO Pvt Ltd.
- Featured three projects with links to their respective GitHub repositories.
- Integrated a profile photo into the hero section.
- Added resume download functionality using `public/documents/resume.pdf`.
- Implemented a contact form that opens the visitor's default email application with a pre-filled message.
- Added the location, Chirala, Andhra Pradesh, India, with an accompanying map.
- Implemented SEO essentials, including a meta description, canonical URL, Open Graph metadata, `Person` structured data, `robots.txt`, and `sitemap.xml`.
- Added a Google Search Console verification file.
- Configured favicons and a web manifest featuring the owner's initials.
- Automated builds and deployments to GitHub Pages through GitHub Actions on every push to `main`.
- Configured the custom domain `maahii.space` with HTTPS using GoDaddy DNS.
- Created a comprehensive README covering project architecture, setup instructions, deployment workflow, and design decisions.

### Changed
- Replaced the original template's personal information with the owner's details, including name, links, email, projects, education, and certifications.
- Removed the deprecated `baseUrl` option from `tsconfig.app.json` to resolve a TypeScript deprecation warning.
- Renamed the GitHub account username to `maahii-in` and updated all associated project links.

### Removed
- Removed the template's AI chat assistant, the **My Services** button, and the legacy contact-form API that referenced the original template author's services.
- Replaced the template's Internships section with a Professional Experience section.
- Removed images belonging to the original template author.

### Known Limitations
- Certificate images and project cover images currently use generated placeholders.
- Featured projects do not yet include live demos.
- Google indexing was still in progress at the time of the initial release.

---

## Release Links

[Unreleased]: https://github.com/maahii-in/maahii-in.github.io/compare/v1.0.0...dev
[1.0.0]: https://github.com/maahii-in/maahii-in.github.io/releases/tag/v1.0.0
