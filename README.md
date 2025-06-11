# FinTrack

<p align="center">
  <img src="banner.jpg" alt="Banner">
</p>

FinTrack is a financial management application built with Next.js and Firebase. It provides users with a comprehensive overview of their financial status, including income, expenses, and savings. The app also includes an AI-powered financial advisor that offers personalized recommendations for saving and budgeting based on the user's tracked data.

## Core Features

- **Dashboard Overview**: Interactive dashboard providing an overview of financial status with income, expenses, and savings.
- **Income Logging**: Ability to manually input income transactions.
- **Expense Tracking**: Ability to manually input expense transactions with categorization support.
- **Expense Categorization**: Categorize and tag all the expenses.
- **AI Financial Advisor**: AI-powered financial advice tool providing recommendations for saving and budgeting based on tracked data.

## Style Guidelines

- **Primary Color**: Blue (#4285F4) to convey trust and stability.
- **Background Color**: Light gray (#F5F5F5) for a clean and modern look.
- **Accent Color**: Green (#34A853) to highlight positive financial changes.
- **Headline Font**: 'Poppins' sans-serif for clear, short text.
- **Body Font**: 'Inter' sans-serif for readability in longer form text.
- **Icons**: Use a set of consistent icons to visually represent different expense categories.
- **Animations**: Use subtle animations for transaction updates and dashboard elements.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fintrack.git
   cd fintrack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage Guidelines

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

3. Use the app to log income and expenses, view your financial dashboard, and receive AI-powered financial advice.

## Configuration Details

- **Tailwind CSS**: Used for styling the application. Configuration can be found in `tailwind.config.ts`.
- **PostCSS**: Used for processing CSS. Configuration can be found in `postcss.config.mjs`.
- **Next.js**: Used for building the application. Configuration can be found in `next.config.ts`.

## Contributing Guidelines

We welcome contributions to FinTrack! Please follow these guidelines to contribute:

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Run the linter and type checker to ensure your code meets our standards:
   ```bash
   npm run lint
   npm run typecheck
   ```

4. Commit your changes and push to your fork.
5. Submit a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
