# AuraStudy: The Kinetic Curator

Welcome to **AuraStudy** — a premium, AI-driven study planner and cognitive productivity dashboard built specifically for university students. 

AuraStudy is designed from the ground up to replace fragmented note-taking apps and manual study blocks with an intelligent, centralized command center.

## 🚀 Features

- **Dynamic Study Planner**: Master your academic timeline. Plan Pomodoro sessions and allocate deep work blocks mathematically aligned to your exam schedules.
- **Smart Library & OCR**: Upload your PDFs and coursework. AuraStudy extracts, vectors, and analyzes your material so the AI Tutor can test you on it.
- **Floating AI Tutor**: A persistent, context-aware AI assistant utilizing Framer-Motion physics that stays with you across every page. Built to quiz you via active recall on your actual class documents—not hallucinated web data.
- **Advanced Progress Analytics**:
  - Auto-calculated Efficiency Baselines & Retention Rates.
  - Interactive Recharts mapping your weekly actual study hours vs targets.
  - Granular subject-focus breakdowns via dynamic pie/donut charts.
  - **Export to PDF**: Generate instantaneous PDF reports of your statistics using native SVG-to-canvas rendering.
- **Help Center & Platform Guide**: Full architectural guide detailing how to safely utilize the platform, including fully animated FAQs.
- **Premium User Profile**: Custom Zod-validated data forms handling everything from profile management to 2FA toggles, dynamically grouped into responsive CSS grids.

## 💻 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) & React 19 Client/Server Components.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) powered by a purely relative `oklch()` design system achieving flawless light/dark mode parity without hex codes.
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/) paired with Radix UI headless components.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for global modals, sidebars, and persistent floating elements.
- **Forms**: `react-hook-form` + `zod` dynamically rendered via our resilient `<GlobalForm>` builder.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, spring physics, and micro-interactions.
- **Charts**: [Recharts](https://recharts.org/) native SVG-based charting optimized via React wrappers.

## 🖌️ Design System
This project heavily leans away from "standard" blue/white templates. We use deep background cards, micro-borders, gradient typography (`.bg-brand-gradient`), and intense shadow physics to create a modern desktop SaaS environment. All CSS variables in `globals.css` are calculated mathematically using OKLCH to allow total color harmony across themes.

## 🛠️ Getting Started

First, install the required dependencies (ensure you are using `yarn` or `npm`):

```bash
npm install
# or
yarn install
```

Then, boot the local development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform. Navigate to `/dashboard` to explore the core application shell!

## 📂 Project Structure

- `app/(dashboard)`: The secured SaaS shell encapsulating all logic for the Sidebar, Analytics, Library, Profile, Help Center, etc.
- `app/(auth)`: The public-facing entry gates (Sign In / Sign Up) masked via polished glassmorphic forms.
- `app/_components`: Shared landing page layouts.
- `components/ui`: Isolated Shadcn UI primitives.
- `components/modals`: Global dialogue boxes managed strictly by Zustand stores (like the Upload Modal).

## 🔮 Future Roadmap
- Complete Supabase Backend infrastructure for Auth & Storage buckets.
- Wire the AI Tutor to real OpenAI embeddings based on the `Library` PDF uploads.
- Cloud sync the Analytics Dashboard metrics.
