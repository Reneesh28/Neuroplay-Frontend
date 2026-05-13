<p align="center">
  <strong>🧠 NeuroPlay Engine</strong><br/>
  <em>AI-Powered Gameplay Analysis Frontend</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=flat-square" alt="TanStack Query" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Pages & Features](#-pages--features)
- [API Integration](#-api-integration)
- [Design System](#-design-system)
- [Type Definitions](#-type-definitions)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

---

## 🧠 Overview

**NeuroPlay Engine** is the frontend client for an AI-powered gameplay analysis pipeline. It enables users to:

1. **Upload** gameplay video files via chunked upload
2. **Track** processing jobs in real time with pipeline visualization
3. **View** AI-generated insights — predicted actions, confidence scores, reasoning, and coaching tips
4. **Simulate** hypothetical gameplay scenarios with instant AI analysis
5. **Explore** analysis results via a dedicated dashboard view
6. **Visualize** intelligence in the **Neural Memory Universe** — a 3D galaxy visualization of vector memories, clusters, and live retrieval paths.

The UI is designed as a premium, dark-mode AI product interface with production-grade UX patterns including loading states, error boundaries, retry mechanisms, and micro-interactions.

---

## ⚡ Tech Stack

| Layer          | Technology                                          |
|----------------|------------------------------------------------------|
| **Framework**  | React 19 + TypeScript 6                              |
| **Build Tool** | Vite 8                                                |
| **Styling**    | Tailwind CSS 4.2 + CSS Custom Properties              |
| **Routing**    | React Router DOM 7                                    |
| **Data**       | TanStack React Query 5 (server state + polling)       |
| **HTTP**       | Axios (interceptors, chunked upload)                  |
| **State**      | Zustand 5 (client state — available for future use)   |
| **Fonts**      | Inter (UI) + JetBrains Mono (code/data)               |
| **Utilities**  | clsx, tailwind-merge                                  |

---

## 🏗 Architecture

The application follows a **feature-based modular architecture** — each domain feature is self-contained with its own components, hooks, and types.

```
┌─────────────────────────────────────────────────┐
│                   main.tsx                       │
│         (QueryClientProvider + App)              │
├─────────────────────────────────────────────────┤
│                    App.tsx                        │
│            (BrowserRouter + Routes)              │
├─────────────────────────────────────────────────┤
│              MainLayout.tsx                      │
│     (Header / Nav / Content / Footer)            │
├──────────┬──────────┬────────────┬──────────────┤
│ Upload   │   Job    │ Simulator  │  Dashboard   │
│  Page    │  Page    │   Page     │    Page      │
├──────────┴──────────┴────────────┴──────────────┤
│            Shared Components                     │
│    (LoadingState, ErrorState, EmptyState)         │
├─────────────────────────────────────────────────┤
│          Services / API Layer                    │
│      (axios instance + API functions)            │
├─────────────────────────────────────────────────┤
│               Backend API                        │
│         http://localhost:5000/api                 │
└─────────────────────────────────────────────────┘
```

**Data Flow:** Pages → Hooks (React Query) → Services (Axios) → Backend API

---

## 📁 Directory Structure

```
neuroplay-frontend/
├── index.html                  # Entry HTML (Google Fonts loaded here)
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config (references)
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.node.json          # Node TypeScript config
├── eslint.config.js            # ESLint configuration
│
├── public/                     # Static assets
│
└── src/
    ├── main.tsx                # App entry point (QueryClientProvider)
    ├── App.tsx                 # Root router + 404 page
    ├── index.css               # Global design system (tokens + utilities)
    ├── App.css                 # Reserved (intentionally empty)
    │
    ├── components/
    │   └── shared/
    │       ├── LoadingState.tsx   # Animated dual-ring spinner
    │       ├── ErrorState.tsx     # Styled error with retry button
    │       └── EmptyState.tsx     # Empty data placeholder
    │
    ├── layouts/
    │   └── MainLayout.tsx        # App shell (header, nav, footer)
    │
    ├── pages/
    │   ├── UploadPage.tsx        # Upload entry point
    │   ├── JobPage.tsx           # Job tracking wrapper
    │   ├── DashboardPage.tsx     # Analysis dashboard wrapper
    │   └── SimulatorPage.tsx     # Simulator page
    │
    ├── features/
    │   ├── upload/
    │   │   ├── components/
    │   │   │   └── UploadBox.tsx       # Drag & drop + chunked upload UI
    │   │   └── hooks/
    │   │       └── useUpload.ts        # Chunk upload logic (init → chunk → complete)
    │   │
    │   ├── job/
    │   │   ├── components/
    │   │   │   └── JobStatus.tsx       # Full job tracking view
    │   │   └── hooks/
    │   │       └── useJob.ts           # Polling job status (auto-stop on complete/fail)
    │   │
    │   ├── pipeline/
    │   │   ├── pipeline.config.ts      # Pipeline step definitions
    │   │   └── components/
    │   │       ├── PipelineView.tsx    # Pipeline visualization container
    │   │       └── PipelineStep.tsx    # Individual step node
    │   │
    │   ├── output/
    │   │   ├── components/
    │   │   │   ├── OutputView.tsx      # Tabbed AI output (Summary + Raw)
    │   │   │   └── JsonViewer.tsx      # Terminal-style JSON viewer
    │   │   └── hooks/
    │   │       └── useResult.ts        # Fetch result (enabled on completion)
    │   │
    │   ├── dashboard/
    │   │   ├── components/
    │   │   │   ├── DashboardView.tsx   # Dashboard layout
    │   │   │   ├── StatsCard.tsx       # Metric card component
    │   │   │   └── InsightCard.tsx     # Insight/tip card component
    │   │   └── hooks/
    │   │       └── useDashboard.ts     # Fetch dashboard data
    │   │
    │   └── simulator/
    │       ├── components/
    │       │   ├── SimulatorInput.tsx  # Scenario textarea + submit
    │       │   └── SimulationResult.tsx # Simulation result card
    │       └── hooks/
    │           └── useSimulation.ts    # Mutation hook for simulation
    │
    ├── services/
    │   ├── axios.ts               # Axios instance (baseURL, interceptors)
    │   └── api/
    │       ├── upload.ts          # initUpload, uploadChunk, completeUpload
    │       ├── job.ts             # getJobStatus, getJobResult
    │       └── simulation.ts      # runSimulation
    │
    └── types/
        ├── api.types.ts           # ApiResponse<T>, ApiError
        └── job.types.ts           # Job, JobStep, StepStatus
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Backend API** running on `http://localhost:5000` (see backend repo)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd frontend/neuroplay-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Backend Connection

The frontend expects the backend API at `http://localhost:5000/api`. This is configured in:

```
src/services/axios.ts
```

```typescript
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 30000,
});
```

> **Note:** If your backend runs on a different host/port, update the `baseURL` accordingly.

---

## 📜 Available Scripts

| Command           | Description                              |
|--------------------|------------------------------------------|
| `npm run dev`      | Start Vite dev server with HMR           |
| `npm run build`    | TypeScript check + production build      |
| `npm run preview`  | Preview production build locally         |
| `npm run lint`     | Run ESLint across the codebase           |

---

## 📄 Pages & Features

### 1. Upload Page (`/`)

| Feature | Detail |
|---------|--------|
| Drag & drop zone | Click or drag files onto the drop area |
| File validation | Accepts MP4, WebM, MOV, AVI — max 500MB |
| Chunked upload | 5MB chunks with real-time progress bar |
| Auto-redirect | Navigates to `/job/:id` on success |

**Flow:** Select File → Init Upload → Stream Chunks → Complete → Redirect to Job

### 2. Job Tracking Page (`/job/:id`)

| Feature | Detail |
|---------|--------|
| Status badge | Color-coded: completed, processing, failed, pending |
| Pipeline visualization | 5-step pipeline with animated connectors |
| Step detail list | Per-step status with error messages |
| Auto-polling | Polls every 2s, stops on complete/fail |
| AI Output | Rendered via `OutputView` when job completes |
| Dashboard link | Direct link to `/dashboard/:id` on completion |

**Pipeline Steps:**
1. Video Processing
2. Feature Extraction
3. Embedding Generation
4. Clustering
5. Simulation

### 3. Dashboard Page (`/dashboard/:id`)

| Feature | Detail |
|---------|--------|
| Stats grid | Predicted action + confidence score |
| Insight cards | AI reasoning + coaching tips |
| Accent variants | Visual emphasis on key metrics |

### 4. Simulator Page (`/simulator`)

| Feature | Detail |
|---------|--------|
| Scenario input | Textarea with character counter |
| Loading state | Inline spinner on the submit button |
| Result card | Action, confidence bar, reasoning, coaching tip |
| Error retry | Reset mutation and retry via button |

### 5. Neural Memory Universe Page (`/neural-universe`)

| Feature | Detail |
|---------|--------|
| 3D Galaxy Engine | Cinematic Three.js visualization of FAISS vector space |
| Domain Separation | Distinct 3D regions for Black Ops and Modern Warfare |
| Digital Twin Cores | Pulsing emissive entities representing player behavioral styles |
| Retrieval Traversal | Real-time particle animation of active neural retrieval paths |
| Tactical Tooltip | On-demand metadata for specific memory clusters |
| Render Diagnostics | Live FPS and node count monitoring |

### 6. 404 Page (`/*`)

Styled not-found page with a back-to-upload CTA button.

---

## 🔌 API Integration

All API calls go through a centralized Axios instance with error interceptors.

### Endpoints Used

| Method | Endpoint                  | Service Function     | Description                     |
|--------|---------------------------|----------------------|---------------------------------|
| POST   | `/upload/init`            | `initUpload()`       | Initialize chunked upload       |
| POST   | `/upload/chunk`           | `uploadChunk()`      | Upload a single file chunk      |
| POST   | `/upload/complete`        | `completeUpload()`   | Finalize upload → returns job_id|
| GET    | `/upload/status/:id`      | `getJobStatus()`     | Poll job status + steps         |
| GET    | `/upload/result/:id`      | `getJobResult()`     | Fetch AI analysis result        |
| POST   | `/simulation/run`         | `runSimulation()`    | Run scenario simulation         |

### API Response Contract

All endpoints return a standardized envelope:

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: ApiError | null;
    meta?: Record<string, any>;
}
```

---

## 🎨 Design System

The global design system is defined in `src/index.css` using CSS custom properties.

### Design Tokens

| Category   | Token                  | Value                           |
|------------|------------------------|---------------------------------|
| Surfaces   | `--bg-base`            | `#080b11` (deepest background)  |
|            | `--bg-surface`         | `#0d1117`                       |
|            | `--bg-elevated`        | `#111827`                       |
|            | `--bg-card`            | `#161d2b`                       |
| Accent     | `--accent`             | `#3b82f6` (electric blue)       |
|            | `--accent-hover`       | `#60a5fa`                       |
| Status     | `--status-completed`   | `#10b981` (green)               |
|            | `--status-processing`  | `#f59e0b` (amber)               |
|            | `--status-failed`      | `#ef4444` (red)                 |
| Text       | `--text-primary`       | `#e2e8f0`                       |
|            | `--text-secondary`     | `#8899aa`                       |
|            | `--text-muted`         | `#4a5568`                       |
| Typography | `--font-sans`          | Inter, system-ui                |
|            | `--font-mono`          | JetBrains Mono, monospace       |

### CSS Classes

| Class            | Purpose                                |
|------------------|----------------------------------------|
| `.card`          | Standard card container with border    |
| `.card-elevated` | Elevated surface card                  |
| `.btn`           | Base button styles                     |
| `.btn-primary`   | Blue accent button with glow hover     |
| `.btn-danger`    | Red-tinted button for destructive acts |
| `.badge-*`       | Status badges (completed/processing/failed/pending) |
| `.animate-fade-up` | Entry animation (opacity + translateY) |

---

## 🧩 Type Definitions

### Job Types (`src/types/job.types.ts`)

```typescript
type StepStatus = "pending" | "processing" | "completed" | "failed";

interface JobStep {
    name: string;
    status: StepStatus;
    retries?: number;
    error?: { code: string; message: string };
}

interface Job {
    job_id: string;
    status: "queued" | "processing" | "completed" | "failed";
    steps: JobStep[];
    created_at?: string;
    updated_at?: string;
}
```

### Simulation Types (`src/services/api/simulation.ts`)

```typescript
interface SimulationInput {
    scenario: string;
}

interface SimulationOutput {
    predicted_action: string;
    confidence: number;
    reasoning: string;
    coaching_tip: string;
}
```

---

## ⚙️ Configuration

### Vite (`vite.config.ts`)

Standard Vite + React plugin configuration with Tailwind CSS integration.

### TypeScript

- **Target:** ES2020
- **Module:** ESNext
- **Strict mode:** Enabled
- Separate configs for app code (`tsconfig.app.json`) and Node tooling (`tsconfig.node.json`)

### Environment

| Variable                  | Default                    | Description          |
|---------------------------|----------------------------|----------------------|
| Backend API Base URL       | `http://localhost:5000/api` | Set in `axios.ts`    |
| Upload Chunk Size          | 5 MB                       | Set in `useUpload.ts`|
| Job Polling Interval       | 2000ms                     | Set in `useJob.ts`   |
| Max Upload File Size       | 500 MB                     | Set in `UploadBox.tsx`|

---

## 🤝 Contributing

1. Follow the existing feature-based directory structure
2. Place new features under `src/features/<feature-name>/`
3. Use React Query hooks for all server state
4. Use the design tokens from `index.css` — avoid hardcoding colors
5. Keep components focused and reusable
6. Run `npm run lint` and `npx tsc --noEmit` before committing

---

<p align="center">
  Built with ⚡ by the NeuroPlay Team
</p>
