<div align="center">

# Mahieshwar Budati

### AI Engineer | LLM, NLP and RAG Systems

Personal portfolio showcasing my work building LLM applications, retrieval-augmented generation systems and live voice agents.

[**Live site: maahii.space**](https://maahii.space)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-181717?logo=github&logoColor=white)

</div>

---

## About

I am an AI Engineer and Machine Learning enthusiast with hands-on experience building NLP and Large Language Model (LLM) applications. I work with Python, LangChain, FastAPI and vector databases to build Retrieval-Augmented Generation (RAG) systems and scalable AI solutions.

Currently working as an AI Engineer at XaasIO Pvt Ltd (remote), building AI/ML workflow pipelines, RAG-based retrieval systems and model-serving infrastructure.

## Features

- Single-page portfolio with smooth section navigation and a floating dock
- Animated hero with a name animation, typewriter roles and an animated neural-network background
- Light and dark themes with a theme toggle
- Skills, experience, projects, education and certifications sections
- Project showcase with GitHub links and a full projects page
- Global search dialog for jumping to sections and projects
- Resume download button
- Contact section with email, LinkedIn, GitHub and a location map
- Responsive layout for mobile, tablet and desktop
- SEO setup: meta tags, Open Graph, structured data (Person), `robots.txt` and `sitemap.xml`

## Featured Projects

| Project | Description | Stack |
| --- | --- | --- |
| [Real-Time AI Voice Agent](https://github.com/maahii-in/javis-live-voice-agent) | Low-latency voice agent with an STT/TTS pipeline connected to an LLM backend for multi-turn conversations. | Python, LiveKit, STT/TTS, LLM |
| [RAG AI System](https://github.com/maahii-in/Basic-Advance-RAG) | Context-aware question answering over document datasets with chunking, embeddings and semantic search. | Python, LangChain, Vector Search |
| [Suicidal Tendencies Detection Model](https://github.com/maahii-in/suicidal-tendency-report) | NLP-based classifier that detects suicidal tendencies in text data. | Python, Pandas, Scikit-learn, NLP |

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router

**UI and effects:** tsParticles, canvas-confetti, Lucide Icons, React Icons

**Tooling:** ESLint, PostCSS, Autoprefixer

**Hosting:** GitHub Pages with GitHub Actions, custom domain on GoDaddy DNS

## Project Structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── public/
│   ├── documents/resume.pdf       # Downloadable resume
│   ├── img/                       # Profile photo, certificates, project covers
│   ├── CNAME                      # Custom domain
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/                # Hero, Skills, Experience, Projects, Contact, ...
│   ├── data/PortfolioData.ts      # Projects, experience, education, certifications
│   ├── hooks/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── index.html                     # SEO tags and structured data
├── tailwind.config.js
└── vite.config.ts
```

## Getting Started

**Prerequisites:** Node.js 18 or newer and npm.

```bash
# Clone the repository
git clone https://github.com/maahii-in/maahii-in.github.io.git
cd maahii-in.github.io

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

The site runs at `http://localhost:3000`.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Customizing the Content

| What to change | Where |
| --- | --- |
| Projects, experience, education, certifications | `src/data/PortfolioData.ts` |
| Skills and logo strip | `src/components/Skills.tsx`, `src/components/SkillLogosScroll.tsx` |
| Hero text, links and name | `src/components/Hero.tsx`, `src/components/NameAnimation.tsx`, `src/components/TypeWriter.tsx` |
| Contact details and map | `src/components/Contact.tsx` |
| Resume | `public/documents/resume.pdf` |
| Profile photo | `public/img/me.jpg` |
| SEO tags and structured data | `index.html`, `public/robots.txt`, `public/sitemap.xml` |

## Deployment

The site is deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`. Every push to `main` builds the project and publishes the `dist` folder.

1. In the repository go to **Settings, Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`. The workflow runs and publishes the site.
3. For a custom domain, add DNS records at your registrar, put the domain in `public/CNAME`, and enter it under **Settings, Pages, Custom domain**.

## Contact

- Website: [maahii.space](https://maahii.space)
- Email: [mahieshwar.budati@gmail.com](mailto:mahieshwar.budati@gmail.com)
- LinkedIn: [mahi-budati1209](https://www.linkedin.com/in/mahi-budati1209)
- GitHub: [maahii-in](https://github.com/maahii-in)
- Location: Chirala, Andhra Pradesh, India

---

<div align="center">

Built by Mahieshwar Budati

</div>
