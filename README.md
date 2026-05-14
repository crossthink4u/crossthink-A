# CrossThink 🧠✨

**Where Ideas Meet Talent**

CrossThink is a premium, cinematic SaaS platform that connects students, faculty, and innovators into one collaborative ecosystem. Built for multidisciplinary collaboration, it allows users to discover projects, build teams, find mentors, and manage workspaces efficiently.

![CrossThink Mission Control](https://img.shields.io/badge/Status-Active-success) ![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?logo=react) ![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

## ✨ Key Features

- **Mission Control Dashboard**: A centralized, information-dense overview of your active projects, tasks, and recommendations.
- **Neural Optimizer Engine**: An AI-driven matchmaking system that pairs you with the perfect teammates, projects, and mentors based on skill topology and synergy scores.
- **Dynamic Workspaces**: Integrated Kanban boards with drag-and-drop capabilities for seamless task management.
- **Cinematic Dark Mode UI**: A premium, "glassmorphism" aesthetic with vibrant gradients and advanced Framer Motion animations.
- **Intelligent Registration Wizard**: A 6-stage AI-driven onboarding process to build a comprehensive user profile.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 + Custom Glassmorphism Utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **State Management**: React Context + LocalStorage persistence
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js 18.x or later installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/crossthink4u/crossthink-A.git
   ```

2. Navigate into the project directory:
   ```bash
   cd crossthink-A
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── dashboard/        # Dashboard modules (Overview, Projects, Teams, AI Match, Workspace)
│   ├── login/            # Authentication
│   ├── register/         # 6-stage Onboarding Wizard
│   ├── profile/          # User Profile
│   └── globals.css       # Global Tailwind & Custom Styles
├── components/           # Reusable UI Components
│   ├── auth/             # Login & Register components
│   ├── dashboard/        # Dashboard specific views and sidebar
│   ├── landing/          # Landing page sections
│   └── ui/               # Base UI elements (Button, GlassCard)
└── context/              # Global State Management (DashboardContext)
```

## 🎨 Design Philosophy

CrossThink prioritizes **Visual Excellence**. The interface is designed to wow the user at first glance, featuring a dark-mode-first aesthetic, dynamic interactive hover states, micro-animations, and vibrant color accents (Cyan & Purple) to create a state-of-the-art feel that goes beyond simple MVPs.

## 📜 License

This project is licensed under the MIT License.
