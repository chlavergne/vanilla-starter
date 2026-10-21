# Vanilla JS Starter Template

[![CI/CD Status](https://github.com/USERNAME/vanilla-starter/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/vanilla-starter/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Biome](https://img.shields.io/badge/Biome-1.9-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, modern Vanilla JavaScript starter template designed for rapid prototyping and clean portfolio integrations. Built for fast local development, zero-bloat disk usage, and strict code quality out of the box.

---

## Tech Stack

* **Bundler & Dev Server:** [Vite](https://vite.dev/) (instant boot, ultra-fast HMR)
* **Package Manager:** [pnpm](https://pnpm.io/) (disk-efficient hard link store)
* **Linter & Formatter:** [Biome](https://biomejs.dev/) (Rust-based ESLint/Prettier alternative)
* **CI/CD:** GitHub Actions (automated linting, type checks, and GitHub Pages deployment)

---

## Getting Started

### 1. Scaffold a New Project

Clone this template without retaining its Git history using `degit`:

```bash
npx degit USERNAME/vanilla-starter my-new-project
cd my-new-project
```

### 2. Install and Initialize

Install dependencies and run the interactive setup to configure your project name, repository URLs, and Vite base path:

```bash
pnpm install
pnpm setup
```
Note: pnpm setup prompts for your GitHub username and repository name, updates all configuration files, and automatically deletes itself once completed.

### 3. Start the Development Server

```bash
pnpm dev
```

Open http://localhost:5173 in your browser.

## Available Scripts

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts the local dev server with Hot Module Replacement |
| `pnpm build` | Bundles and minifies production-ready assets into `/dist` |
| `pnpm preview` | Serves the local production build for testing |
| `pnpm lint` | Runs Biome checks across the `src/` directory |
| `pnpm lint:fix` | Automatically applies safe fixes to lint and format errors |
| `pnpm format` | Formats all source files with Biome rules |
| `pnpm ci` | Executes Biome strict check and `vite build` (used in CI) |

## Project Structure

```Plaintext
.
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD quality gates & GitHub Pages deploy
├── .vscode/
│   ├── extensions.json   # Recommended editor extensions (Biome)
│   └── settings.json     # Format-on-save with Biome as default formatter
├── scripts/
│   └── setup.js          # Interactive setup (auto-deleted after run)
├── src/
│   ├── app.js            # Encapsulated component logic
│   ├── main.js           # DOM entry point and initialization
│   └── style.css         # Scoped project styles
├── .gitignore            # Git exclusion rules
├── biome.json            # Biome formatter & linter configuration
├── index.html            # HTML entry point
├── lefthook.yml          # Fast Git pre-commit hooks configuration (Biome formatting)
├── package.json          # Dependency manifest and scripts
├── pnpm-lock.yaml        # Pinned dependency lockfile
├── pnpm-workspace.yaml   # Explicit permissions for dependency build scripts
├── README.md             # Project documentation
└── vite.config.js        # Vite bundling and base path configuration
```
## Continuous Integration & Deployment

The included GitHub Actions workflow runs on every push and pull request:
1. Pull Requests: Runs pnpm install --frozen-lockfile, verifies formatting and linting via pnpm biome ci src, and checks build compilation via pnpm build.

2. Main Branch: Validates code quality, generates production assets, and automatically deploys the /dist folder to GitHub Pages.

## GitHub Repository Setup

1. Go to your repo on GitHub: Settings > Pages.
2. Under Build and deployment > Source, choose GitHub Actions.
3. In vite.config.js, verify that the base attribute matches your repository path if deployed under a subpath:

```Javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vanilla-starter/' : '/',
});
```

