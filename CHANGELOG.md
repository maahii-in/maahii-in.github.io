# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version Overview

| Version | Date | Summary |
| --- | --- | --- |
| [Unreleased](#unreleased) | In progress | Licensing, build optimization and documentation improvements |
| [1.0.0](#100---2026-10-15) | 2026-10-15 | First public release at [maahii.space](https://maahii.space) |

---

## [Unreleased]

Changes merged into `main` that have not yet been tagged as a release. Every push to `main` is deployed to [maahii.space](https://maahii.space), so the changes listed here may already be live.

### Added
- MIT `LICENSE` covering the source code of this repository.
- `docs/PROJECT_DOCUMENTATION.md`, a start-to-finish record of how the site was built, deployed and configured.
- README sections for build output, security and privacy, maintenance, troubleshooting, documentation and license and usage.

### Changed
- Optimized the Vite build configuration: third-party packages are split into cacheable vendor chunks, the deployment base path is explicit, development and preview ports are fixed, and production source maps are disabled. This removes the large-chunk build warning.
- Adopted a single-branch workflow. All work happens on `main`, and changes are verified locally with `npm run build` before each push.
- Rewrote the README workflow, architecture diagram and design decisions to reflect the single-branch process.

### Removed
- The temporary `dev` branch and its pull-request workflow, which were introduced and retired after the initial release.

---

## [1.0.0] - 2026-10-15

Initial public release of the personal portfolio website at [maahii.space](https://maahii.space).

### Added
- Portfolio content built from resume data: introduction, technical skills, professional experience, projects, education, certifications and contact information.
- Animated name display and a typewriter effect cycling through the roles AI Engineer, LLM Developer, RAG Systems Builder and ML Enthusiast.
- Technical skills organized into Languages and Databases, AI and LLM, Machine Learning, and MLOps and Tools, with a matching technology logo strip.
- Professional experience entry for the AI Engineer role at XaasIO Pvt Ltd.
- Three featured projects linked to their GitHub repositories: Real-Time AI Voice Agent, RAG AI System and Suicidal Tendencies Detection Model.
- Profile photo in the hero section.
- Resume download from `public/documents/resume.pdf`.
- Contact form that opens the visitor's default email application with a pre-filled message.
- Location set to Chirala, Andhra Pradesh, India, with a matching embedded map.
- Search engine optimization: meta description, canonical URL, Open Graph metadata, `Person` structured data, `robots.txt` and `sitemap.xml`.
- Google Search Console verification file.
- Favicons and a web manifest based on the owner's initials.
- Automated build and deployment to GitHub Pages through GitHub Actions on every push to `main`.
- Custom domain `maahii.space` served over HTTPS, configured through GoDaddy DNS.
- Project README covering architecture, setup, deployment workflow and design decisions.

### Changed
- Replaced all personal data inherited from the original template with the owner's details, including name, links, email, projects, education and certifications.
- Removed the deprecated `baseUrl` option from `tsconfig.app.json` to resolve a TypeScript deprecation warning. The `@/` import alias continues to work through `paths` and Vite.
- Renamed the GitHub account to `maahii-in` and updated all associated links.

### Removed
- The template's AI chat assistant, the **My Services** button and the contact-form API, all of which pointed to the original author's services.
- The template's Internships section, replaced by a Professional Experience section.
- Images belonging to the original template author.

### Security
- Replaced the template's third-party contact-form endpoint with a client-side `mailto:` link, so visitor messages no longer pass through a server operated by someone else.

### Known Limitations
- Certificate and project cover images are generated placeholders.
- Featured projects do not yet include live demos.
- Google indexing of the site was still in progress at the time of release.

---

## Release Links

[Unreleased]: https://github.com/maahii-in/maahii-in.github.io/compare/v1.0.0...main
[1.0.0]: https://github.com/maahii-in/maahii-in.github.io/releases/tag/v1.0.0