# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

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
- Google indexing of the site is still in progress
