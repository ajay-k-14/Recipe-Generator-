# Recipe Generator  
A web-application that helps you generate and manage recipes, built using TypeScript, TailwindCSS & Vite.

---

## 🚀 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Contributing](#contributing)
- [Contact](#contact)

---

## About  
The **Recipe Generator** allows users to quickly create, view, and manage recipes. The UI is built with a modern frontend (TypeScript + TailwindCSS) and is designed for easy customization and extension.  
Whether you’re building a personal cookbook or a shared recipe platform, this project gives you a solid foundation.

---

## Features  
- Generate a new recipe (with title, ingredients list, steps).  
- View a list of existing recipes.  
- Edit/update or delete recipes.  
- Responsive design – works on mobile & desktop.  
- Built with modern web tooling (Vite + TypeScript + TailwindCSS).  
- Easily extensible (e.g., add categories, search/filter, user-accounts).  

---

## Tech Stack  
- **Frontend**: TypeScript, Vite, TailwindCSS  
- **Styles**: PostCSS, Tailwind config  
- **Build Tools**: Vite (fast dev server & build)  
- **Other**: ESLint, Prettier (for code style)  
- **(Optional / Future)**: Backend & database (Supabase, API endpoints)  

---

## Getting Started  

### Prerequisites  
- Node.js (v16+ recommended)  
- npm or yarn  
- (Optional) If using a backend or environment variables: set up accordingly  

### Installation  
bash
#### Clone the repo

git clone https://github.com/ajay-k-14/Recipe-Generator-.git

cd Recipe-Generator

#### Install dependencies

npm install

 or
 
yarn install

Running the App
#### Start development server

npm run dev

 or
 
yarn dev

Then open http://localhost:5173
 (or the port shown) in your browser to see the app.


#### Usage

Launch the app in dev mode (see above).

On the homepage, choose “Create New Recipe”.

Fill in recipe title, ingredients (one per line or comma-separated), and steps.

Save the recipe, and it will appear in your list of recipes.

Click on a recipe to view the full details.

Use the edit or delete options to modify or remove existing recipes.

Tip: You can extend the recipe model (e.g., add prep time, servings, photo upload) by editing the relevant TypeScript model and UI components.

Project Structure

Recipe-Generator/

├─ .github/ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # GitHub workflows (CI/CD)  
├─ public/‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Static assets  
├─ src/ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Source code  
│  ├─ components/‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # UI components  
│  ├─ pages/‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Routes / pages  
│  ├─ styles/‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Tailwind + PostCSS config  
│  ├─ models/‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # TypeScript models/interfaces  
│  └─ App.tsx ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Main app entry point  
├─ .env ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Environment variables (***not checked-in***)  
├─ package.json ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # NPM/Yarn dependencies & scripts  
├─ tailwind.config.ts ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Tailwind CSS configuration  
├─ tsconfig.json ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # TypeScript configuration  
└─ README.md‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ # Project documentation


# Configuration & Environment Variables

If your project uses environment variables (for example, a backend URL or Supabase project config), place them in a .env file at the project root.
Typical variables might include:

VITE_API_URL=https://your-backend.com/api
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key


Be sure to add .env to your .gitignore so you don’t accidentally commit secrets.

# Contributing

Contributions are welcome! Here’s how you can help:

Fork the repository.

Create a new branch (git checkout -b feature/my-feature).

Make your changes and commit (git commit -m "Add feature").

Push to your branch (git push origin feature/my-feature).

Open a Pull Request describing your changes.

Please ensure your code follows the existing style conventions (ESLint/Prettier) and includes tests if you add new functionality.

# Contact

Author: Ajay

Email: aky.ajayk@gmail.com

GitHub: ajay-k-14


Thank you for using Recipe Generator!
Happy cooking and happy coding 🍳











