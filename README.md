# Simple Western Explorer

An interactive React + TypeScript SPA that demonstrates the advantages of Bio-Techne's Simple Western platform (Jess/Abby) compared to traditional Western blotting.

## Features

- **Interactive Experiment Simulator** — configure sample type, target protein, detection method, concentration, and number of samples, then click "Run Simulation" to see results update live
- **Traditional Western Blot Panel** — SVG gel visualization with ladder bands, noise artifacts, and protocol step breakdown highlighting pain points
- **Simple Western Panel** — electropherogram chart (Chart.js) with Gaussian peaks, digital lane view, and streamlined 4-step protocol
- **Workflow Comparison** — side-by-side step stepper with hover tooltips comparing both workflows
- **CTA Bar** — "Request a Demo" / "Contact Sales" / "Learn More" buttons with modal stubs

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  components/
    ExperimentSetupPanel.tsx   # Controls panel
    TraditionalBlotPanel/      # Gel SVG + protocol steps
    SimpleWesternPanel/        # Electropherogram + digital lane + steps
    WorkflowComparison.tsx     # Side-by-side stepper
    TopNav.tsx                 # Sticky navigation
    CTABar.tsx                 # Call-to-action section
  data/                        # JSON datasets (proteins, protocols, sample types)
  hooks/useSimulation.ts       # Simulation state management
  types/index.ts               # Shared TypeScript interfaces
  utils/                       # gelRenderer, electropherogram, analytics
```
