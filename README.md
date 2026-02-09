# React CRUD User Management

A simple, extensible React-based CRUD application for managing user data. Built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **User Management**: Create, Read, Update, and Delete users.
- **Form Validation**: Robust validation using React Hook Form and Zod.
- **Extensible Architecture**: Add new fields via configuration without changing UI code.
- **Responsive Design**: Beautiful UI built with Tailwind CSS.
- **Pure Frontend**: Logic runs entirely in the browser using `localStorage`.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State/Form**: React Hook Form, Zod
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd deltasigma-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the app**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
    Visit `http://localhost:5173` in your browser.

## Extensibility Guide

To add a new field (e.g., "Address") to the user form:

1.  Open `src/config/userFormConfig.ts`.
2.  Add a new object to the `userFormConfig` array:
    ```typescript
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "123 Main St",
      required: true,
      validation: {
        minLength: 5
      }
    }
    ```
3.  The form UI and validation schema will automatically update.

## Design Decisions

- **Configuration-Driven UI**: I used a config file (`userFormConfig.ts`) to generate the form. This makes it very easy to add new fields (like "Address") without touching the React components.
- **Pure Frontend Strategy**: I removed the JSON Server dependency and used `localStorage` instead. This ensures the deployed app works 100% of the time without needing a paid backend hosting service.
- **TypeScript**: Used for type safety and to prevent common bugs (Bonus requirement).
