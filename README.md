# Forrof - Digital Agency Portfolio

A modern, high-performance portfolio and agency website built with React, TypeScript, and Vite. This application showcases projects, articles, and career opportunities, complete with a comprehensive admin dashboard for content management.

## 🚀 Features

-   **Dynamic Portfolio**: Showcase projects with detailed case studies (`/projects`).
-   **Blog & Articles**: Informative articles section (`/articles`).
-   **Careers**: Job listings and application flow (`/careers`).
-   **Admin Dashboard**: Secure admin area to manage jobs, applications, and blog posts (`/admin`).
-   **Interactive UI**: Smooth animations using Framer Motion and GSAP, with 3D elements via React Three Fiber.
-   **Responsive Design**: Fully responsive layout optimized for all devices.
-   **Dark/Light Mode**: Theme handling with `next-themes`.

## 🛠 Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) (likely Shadcn UI)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
-   **3D**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd forrof-soon
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    bun install
    ```

3.  **Environment Setup:**

    Create a `.env` file in the root directory. You can copy the structure from a `.env.example` if available, or confirm the required variables:

    ```env
    VITE_API_BASE="https://api.forrof.io/api/v1"
    VITE_SERVER="https://dev.gemseeroo.com"
    ```

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the app for production. |
| `npm run build:dev` | Builds the app for development mode. |
| `npm run preview` | Locally preview the production build. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

## 📂 Project Structure

-   `src/components`: Reusable UI components.
-   `src/pages`: Application views/pages (Index, Projects, Articles, Admin, etc.).
-   `src/context`: React Context providers (Theme, etc.).
-   `src/hooks`: Custom React hooks.
-   `src/services`: API service definitions (`src/services/api.ts`).
-   `src/lib`: Utility functions.
-   `public`: Static assets.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
