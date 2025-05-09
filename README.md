# Bank App

A simple banking application built with React, TypeScript, and Vite. This app allows users to perform deposit and withdrawal transactions while maintaining a balance.

## Features

- Deposit and withdraw funds.
- Displays current balance.
- Validates input for transactions.
- Confirmation dialog for canceling transactions.
- Error handling for insufficient balance.

## Tech Stack

- **Frontend:** React, TypeScript, Material-UI
- **Testing:** Vitest, React Testing Library
- **State Management:** Context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prasantasaha/interview-assignment.git
   cd bank-app
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the App

Start the development server:

```bash
pnpm dev
```

### Running Tests

Run the test suite:

```bash
pnpm test
```

## Project Structure

- `src/components`: React components.
- `src/constants.ts`: Shared constants.
- `src/context`: Context API for state management.
- `src/tests`: Unit and integration tests.
- `public/`: Static assets.
- `vite.config.ts`: Vite configuration file.
