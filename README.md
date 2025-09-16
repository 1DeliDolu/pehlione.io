# Portfolio Project: React + TypeScript + Vite

This project is a portfolio website built using modern web technologies. It showcases the developer's skills, projects, and professional experience. The application is designed to be fast, responsive, and easy to maintain.

## Project Structure

The project follows a modular structure to ensure scalability and maintainability:

```
public/
  CNAME          # Custom domain configuration
  foto.JPG       # Profile photo
  vite.svg       # Vite logo
src/
  App.css        # Global styles
  App.tsx        # Main application component
  index.css      # Base styles
  main.tsx       # Application entry point
  vite-env.d.ts  # Vite environment types
  assets/        # Static assets like images
  components/    # Reusable React components
    Footer.tsx   # Footer component
    Header.tsx   # Header component
    Lebenslauf.tsx # CV rendering component
    cv/          # CV-related logic
      cv.ts      # CV rendering and PDF generation logic
    Sections/    # Page sections
      Certificates.tsx
      CV.tsx
      DeveloperInfo.tsx
      Hobbies.tsx
      Projects.tsx
      Repos.tsx
```

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe JavaScript development.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For utility-first styling.
- **jsPDF**: For generating PDF files.
- **html2canvas**: For rendering HTML elements to canvas.

## Features

- **Dynamic CV Rendering**: The `Lebenslauf` component dynamically renders a CV in A4 format and provides options to download or preview it as a PDF.
- **Responsive Design**: Ensures the website looks great on all devices.
- **Custom Domain**: Configured with a `CNAME` file for deployment.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/1DeliDolu/pehlione.io.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pehlione.io
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build the project for production:

```bash
npm run build
```

### Linting

Run ESLint to check for code quality:

```bash
npm run lint
```

## License

This project is licensed under the MIT License.
