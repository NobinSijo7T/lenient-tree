# Lenient

Residency Internship landing page for Lenient Tree, built with Next.js and React.

## Requirements

- Node.js 20 or newer
- npm

Check your local versions:

```bash
node -v
npm -v
```

## Setup

1. Clone or open this project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the local development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Next.js dev server. |
| `npm run build` | Creates a production build. |
| `npm run start` | Runs the production build after `npm run build`. |
| `npm run lint` | Runs the configured Next.js lint command. |

## Tech Stack

| Stack | Logo | Used For |
| --- | --- | --- |
| Next.js | ![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=nextdotjs&logoColor=white) | App framework, routing, image optimization, production build. |
| React | ![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=000000) | UI components and client-side interactivity. |
| TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white) | Typed React and Next.js code. |
| CSS Modules | ![CSS Modules](https://img.shields.io/badge/CSS%20Modules-local%20styles-000000?logo=cssmodules&logoColor=white) | Component-scoped styling. |
| Framer Motion | ![Framer](https://img.shields.io/badge/Framer%20Motion-12.40.0-0055FF?logo=framer&logoColor=white) | Motion and animation utilities. |
| Lenis | ![Lenis](https://img.shields.io/badge/Lenis-1.3.23-111111) | Smooth scrolling support. |
| OGL / WebGL | ![WebGL](https://img.shields.io/badge/OGL-1.0.11-990000?logo=opengl&logoColor=white) | WebGL-based visual effects. |
| Lucide React | ![Lucide](https://img.shields.io/badge/Lucide%20React-1.16.0-F56565?logo=lucide&logoColor=white) | Icon components. |
| ESLint | ![ESLint](https://img.shields.io/badge/ESLint-9.25.1-4B32C3?logo=eslint&logoColor=white) | Code linting. |
| npm | ![npm](https://img.shields.io/badge/npm-package%20manager-CB3837?logo=npm&logoColor=white) | Dependency and script management. |

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | Main Next.js app files, layout, page, and page-level styles. |
| `components/` | Reusable UI sections and feature components. |
| `components/about-us/` | About section assets and components. |
| `components/guidelines/` | Guidelines timeline/path section. |
| `public/` | Static images, fonts, and visual assets. |
| `package.json` | Dependencies and npm scripts. |

## Edit the Footer Countdown

The footer countdown lives in:

```text
components/container.tsx
```

Find this line near the top of the file:

```ts
const COUNTDOWN_TARGET = new Date("2026-06-10T10:00:00+05:30").getTime();
```

Change the date/time string to update the countdown target.

Examples:

```ts
// June 10, 2026 at 10:00 AM IST
const COUNTDOWN_TARGET = new Date("2026-06-10T10:00:00+05:30").getTime();

// July 1, 2026 at 9:30 AM IST
const COUNTDOWN_TARGET = new Date("2026-07-01T09:30:00+05:30").getTime();
```

Format to use:

```text
YYYY-MM-DDTHH:mm:ss+05:30
```

The countdown updates every second and displays:

```text
DAYS / HRS / MINS / SECS
```

## Build Check

Before sharing or deploying changes, run:

```bash
npm run build
```
