# Static Blog

A modern, static blog built with Next.js 15, TypeScript, and Tailwind CSS. Features a terminal-style interface with ASCII art titles and markdown content rendering.

## High-Level Architecture

The blog follows a static site generation approach with content stored as markdown files:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Content       │    │   Next.js App    │    │   Static HTML   │
│   (.md files)   │───▶│   (SSG)          │───▶│   (GitHub Pages)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

- **Content Layer**: Markdown files with frontmatter metadata in `/content/`
- **Processing Layer**: Next.js static site generation using `getStaticProps` and `getStaticPaths`
- **Presentation Layer**: React components with Tailwind CSS styling
- **Deployment Layer**: GitHub Pages via GitHub Actions workflow

## Directory Structure

```
static-blog/
├── content/                  # Blog posts in markdown format
│   └── <post_name>.md
├── pages/                    # Next.js pages
│   ├── index.tsx            # Blog listing page with terminal UI
│   ├── [slug].tsx           # Dynamic blog post pages
│   ├── _app.tsx             # App component
│   └── _document.tsx        # Document configuration
├── styles/                   # Global styles
│   └── globals.css
├── .github/
│   └── workflows/
│       └── publish-to-pages.yml  # GitHub Pages deployment
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Key Features

- **Terminal-Style UI**: Retro terminal aesthetic with ASCII art blog titles
- **Static Generation**: Fast loading with pre-built HTML pages
- **Markdown Support**: Full GitHub-flavored markdown rendering
- **Tag System**: Blog post categorization with tags
- **TypeScript**: Type-safe development
- **No Database**: Content managed through markdown files

## Technology Stack

- **Framework**: Next.js 15 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter parsing
- **UI Components**: React Markdown, Heroicons
- **Deployment**: GitHub Pages (static export)
- **Package Manager**: pnpm

## Setup and Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Local Development

1. Clone the repository
```bash
git clone <repository-url>
cd static-blog
```

2. Install dependencies
```bash
pnpm install
```

3. Start development server
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Adding New Blog Posts

1. Create a new markdown file in `/content/` directory
2. Add frontmatter with title, date, and tags:
```yaml
---
title: Your Blog Post Title
date: 2024-02-10T12:00:00.000Z
tags:
    - tag1
    - tag2
---
```

3. Write your markdown content below the frontmatter
4. The blog will automatically pick up the new post

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build static site for production
- `pnpm start` - Serve built static site locally
- `pnpm preview` - Build and serve static site
- `pnpm lint` - Run ESLint

## Deployment Strategy

### GitHub Pages (Primary)

The blog is configured for automatic deployment to GitHub Pages:

1. **Trigger**: Push to `main` branch or manual workflow dispatch
2. **Build**: Next.js static site generation (`output: "export"`)
3. **Deploy**: GitHub Pages deployment via Actions

### Manual Static Export

For alternative deployment platforms:

```bash
pnpm build
# Static files available in /out/ directory
```

The static export is optimized for:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Configuration

### Next.js Configuration (`next.config.ts`)
- Static export enabled (`output: "export"`)
- Image optimization disabled for static hosting
- React Strict Mode enabled

### Tailwind CSS
- Custom color scheme matching terminal theme
- Responsive utilities
- Component classes for consistent styling

## Development Notes

- Blog posts use `figlet` for ASCII art title generation
- Dates are handled with `dayjs` for relative time display
- Content parsing uses `gray-matter` for frontmatter extraction
- Static site generation ensures fast load times and SEO optimization

## Customization

### Theme Colors
Update the Tailwind config to modify the terminal color scheme:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'background': '#1a1a1a',
      'foreground': '#00ff00',
      // ... other colors
    }
  }
}
```

### Typography
Modify the `FrontmatterFactory` in `pages/index.tsx` to change ASCII art settings.

## TODO

- Responsive Design
- CMD utility to create a new blog post
- Terminal window like border around the content
- Different directories for content grouping like `Posts/`, `Notes/`, `Ideas/` etc.,
- Create a home page with the below content
    - Kaizen
    - Current Company Name
    - Name of Book currently being Read
    - Search

## License

Private repository - All rights reserved.
