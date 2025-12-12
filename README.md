# <Amanpreet /> Portfolio

A modern, developer-centric portfolio website built with Next.js, designed to showcase skills and projects with a futuristic, "code-first" aesthetic.

## 🚀 Features

-   **Developer Aesthetic**: "VS Code" style bio blocks, `<component />` style headings, and terminal-like path navigation.
-   **Centralized Configuration**: All personal data, projects, and stats are managed in a single file (`src/data/portfolio.js`) for easy updates.
-   **Dynamic Stats**: Configure to show live GitHub statistics or manual custom values.
-   **Dark & Modern UI**: Sleek dark theme with glassmorphism effects (`.glass`) and electric blue accents.
-   **Animations**: Smooth page transitions and entrance effects using Framer Motion.
-   **Responsive**: Fully optimized for mobile, tablet, and desktop screens.
-   **Resume Download**: Built-in support for PDF resume download.

## 🛠 Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (`sonner` for toasts)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 🏃‍♂️ Getting Started

### Prerequisites

-   Node.js 18+ installed

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Amanbig/portfolio1.git
    cd portfolio1
    ```

2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

Make this portfolio your own by editing `src/data/portfolio.js`.

### Personal Info & Projects
Update the `personalInfo`, `projects`, `resume`, and `contact` objects with your details.

### Stats Configuration
You can choose to fetch live stats from GitHub or use manual values.

```javascript
stats: {
    useGithub: true, // Set to false to use manual 'value' properties below
    // ...
}
```

## 📁 Project Structure

-   `src/app`: Application routes and pages.
-   `src/components`: Reusable UI components.
-   `src/data`: Centralized data configuration (`portfolio.js`).
-   `src/lib`: Utility functions.
-   `public`: Static assets (images, resume).

## 📄 Resume

Place your PDF resume in `public/resume/YourName.pdf` and update the `resumeUrl` in `src/data/portfolio.js`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.