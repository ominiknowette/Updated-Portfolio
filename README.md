# By David

A portfolio website for David Okafor, built as a paper-inspired digital publication. The experience blends storytelling, chapter-based navigation, and animated page turns to present selected work, graphic design, experience, and contact details in a unique editorial format.

This project is intentionally static and lightweight: it runs with plain HTML, CSS, and JavaScript, with no framework or bundler required.

## Live preview

Start the local preview server from the project root:

```bash
python serve.py
```

Then open:

```text
http://127.0.0.1:4174/
```

## Overview

This portfolio is designed like a physical publication rather than a typical modern portfolio landing page. It includes:

- chapter-style navigation
- animated “paper turn” transitions between pages
- project case studies and gallery views
- graphic design and editorial sections
- responsive layout for desktop and mobile experience
- static asset-driven architecture

The site presents work in a more narrative form, giving each project its own moment and context instead of a conventional card-based layout.

## Features

- Smooth route-like navigation between chapters
- Paper-turn motion effects with reduced-motion fallback
- Project and portfolio case study pages
- Graphic design gallery and image viewer
- Experience and education section
- Contact page with social/project references
- Static deployment support for Vercel

## Project structure

```text
.
├── app.js                 # Routing, page rendering, page-turn animation, viewers
├── content.js             # Portfolio content, project entries, graphics, metadata
├── styles.css             # Layout, typography, interaction design, responsive styling
├── index.html             # App shell and document metadata
├── serve.py               # Local static server for preview
├── paper-turn-worker.js   # Worker logic for paper-turn visual effects
├── vercel.json            # Deployment configuration for Vercel
├── assets/                # Images, icons, textures, project assets, graphics
├── README.md              # Project documentation
├── .gitignore             # Ignore rules
└── LICENSE                # If present in your repository
```

## Tech stack

This project is built using:

- HTML
- CSS
- JavaScript
- Python (for local static serving)
- Vercel (deployment target)

There is no package manifest, build pipeline, or framework setup in this repository. The site is served as static files.

## Getting started

### Prerequisites

- Python 3.x

### Run locally

From the repository root:

```bash
python serve.py
```

Then visit:

```text
http://127.0.0.1:4174/
```

## Deployment

This project is configured for static deployment and is compatible with Vercel. The repository includes `vercel.json`, which supports rewritten routes for the portfolio.

To deploy:

1. Push the repository to GitHub
2. Import it into Vercel
3. Set the project to use the root directory
4. Deploy without any additional build step

## Content highlights

The portfolio includes a mix of:

- featured client/project work
- repository-based case studies
- design and experiments
- personal and professional background
- technology and workflow references

Project entries cover areas such as:

- web applications
- business and landing pages
- UI-driven product concepts
- design and visual communication
- personal portfolio storytelling

## Notes

This is a handcrafted static portfolio, not a React or Next.js app. The project prioritizes design and interaction over framework complexity, making it ideal as a single-page, editorial-style portfolio experience.

## Verification

The project includes validation work for:

- JavaScript syntax checks for core files
- `vercel.json` parse validation
- browser-based review across chapter routes and viewport sizes
- motion and responsiveness testing with reduced-motion considerations

## License

If you are publishing this project publicly, check whether a license file exists in the repository and confirm the correct usage terms before redistribution.
