# NY Times Most Popular Articles App

## Introduction

This project is a web application that displays the most popular articles from the NY Times. The application is built using Next.js and TypeScript and leverages various modern web development tools and practices.

## Table of Contents

- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [End-to-End Testing](#end-to-end-testing)
- [GitHub Workflow](#github-workflow)
- [Linting and Formatting](#linting-and-formatting)

## Setup

1. Clone the repository:
   `git clone <repository-url>`
2. Navigate to the project directory:
   `cd ny-times-most-popular-assignment`
3. Install the dependencies:
   `npm install`
4. Create a `.env.local` file and add your NY Times API key:
   `NYT_API_KEY=your-api-key`

## Running the Project

- To start the development server:
  `npm run dev`
- To create a production build:
  `npm run build`
- To start the production server:
  `npm start`
- To run tests:
  `npm run test`
- To run end-to-end tests:
  `npm run test:e2e`
- To lint the code:
  `npm run lint`
- To format the code:
  `npm run format`

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A statically typed superset of JavaScript.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework.
- **Jest**: A delightful JavaScript testing framework.
- **React Testing Library**: A library for testing React components.
- **Playwright**: A framework for end-to-end testing.

## Testing

This project uses Jest and React Testing Library for unit tests. To run tests:

`npm run test`

The test configuration is set up to handle TypeScript files and includes various testing utilities and mocks.

## End-to-End Testing

End-to-end tests are written using Playwright. To run the end-to-end tests:

`npm run test:e2e`

The Playwright configuration file is located at `playwright.config.ts`.

## GitHub Workflow

The project includes a comprehensive GitHub Actions workflow for automated testing, linting, formatting, and deployment. The workflow file is located at `.github/workflows/deploy.yml` and consists of the following steps:

### Workflow Triggers

The workflow is triggered by:

- Push events to the `main` branch.
- Manual dispatch through the GitHub Actions interface.

### Jobs

1. **Lint**:

   - **Name**: ✅ Lint
   - **Runs on**: `ubuntu-latest`
   - **Steps**:
     - Checkout the repository.
     - Set up Node.js using the version specified in `.nvmrc`.
     - Install project dependencies using `npm ci`.
     - Run the lint check using `npm run lint`.

2. **Format**:

   - **Name**: 💅 Prettier
   - **Runs on**: `ubuntu-latest`
   - **Steps**:
     - Checkout the repository.
     - Set up Node.js using the version specified in `.nvmrc`.
     - Install project dependencies using `npm ci`.
     - Run the Prettier check using `npm run format:check`.

3. **TypeScript Check**:

   - **Name**: 📘 TypeScript
   - **Runs on**: `ubuntu-latest`
   - **Steps**:
     - Checkout the repository.
     - Set up Node.js using the version specified in `.nvmrc`.
     - Install project dependencies using `npm ci`.
     - Run the TypeScript check using `npm run types:check`.

4. **Unit Tests**:

   - **Name**: 🧪 Unit Tests
   - **Needs**: [lint, format, tsc]
   - **Runs on**: `ubuntu-latest`
   - **Steps**:
     - Checkout the repository.
     - Set up Node.js using the version specified in `.nvmrc`.
     - Install project dependencies using `npm ci`.
     - Run unit tests with coverage using `npm test -- --coverage`.

5. **E2E Tests**:

   - **Name**: 🧪 E2E Tests
   - **Needs**: [lint, format, tsc]
   - **Runs on**: `ubuntu-latest`
   - **Steps**:
     - Checkout the repository.
     - Set up Node.js using the version specified in `.nvmrc`.
     - Install project dependencies using `npm ci`.
     - Start the development server using `npm run dev`.
     - Run end-to-end tests using Playwright with the command `npx playwright test --config=playwright.config.ts`.

6. **Build and Deploy**:
   - **Name**: 🚀 Build and Deploy to Vercel
   - **Needs**: [unit-tests, e2e-tests]
   - **Runs on**: `ubuntu-latest`
   - **Steps**:
     - Checkout the repository.
     - Set up Node.js using the version specified in `.nvmrc`.
     - Install the Vercel CLI globally.
     - Pull Vercel environment information from production using the provided Vercel token.
     - Move environment variables to `.env.production`.
     - Build project artifacts for production using `vercel build --prod`.
     - Deploy project artifacts to production using `vercel deploy --prebuilt --prod`.

## Linting and Formatting

The project uses ESLint for linting and Prettier for code formatting. The configurations are located in the following files:

- ESLint configuration: `.eslintrc.json`
- Prettier configuration: `.prettierrc`

To lint the code:

`npm run lint`

To format the code:

`npm run format`

## Additional Configuration

- **Husky**: Used for Git hooks. Configured to run linting and tests before commits.
- **Lint-Staged**: Runs linters on staged files to ensure code quality before committing.

## Environment Variables

The project requires the following environment variables to be set:

- `NYT_API_KEY`: Your NY Times API key.

You can set these variables in a `.env.local` file in the root directory of the project.
