# E-commerce Management System

A modern, production-ready e-commerce management frontend built with React, TypeScript, Material-UI, and Vite.

## 🚀 Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React features
- 🎨 **Material-UI** - Beautiful, customizable components
- 🔷 **TypeScript** - Type safety and better DX
- 🧭 **React Router v6** - Data Router with loaders and actions
- 🔄 **React Query** - Powerful data synchronization
- 🎭 **Theme System** - Light/Dark mode with persistence
- ✨ **ESLint & Prettier** - Code quality and formatting
- 🧪 **Vitest & Testing Library** - Fast unit testing
- 🪝 **Husky & lint-staged** - Pre-commit hooks

## 📦 Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6 (Data Router)
- **State Management**: React Query
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier + Husky

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ThemeToggle.tsx
│   └── SideMenu.tsx
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── Orders.tsx
│   ├── Login.tsx
│   └── ErrorPage.tsx
├── layouts/         # Layout components
│   └── RootLayout.tsx
├── hooks/           # Custom React hooks
│   └── useThemeMode.tsx
├── services/        # API services with React Query
│   └── productService.ts
├── utils/           # Utility functions
│   └── api.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── theme/           # Theme configuration
│   ├── palette.ts
│   └── theme.ts
├── router.tsx       # Route configuration
├── App.tsx          # Main App component
├── main.tsx         # App entry point
└── setupTests.ts    # Test configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd material-ui-vite-ts
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
cp .env.example .env
```

4. Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:mock` - Start dev server with API mocking enabled
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 🎨 Theme Customization

The app includes a fully customizable theme system with light/dark mode support.

### Theme Files

- `src/theme/palette.ts` - Color palette definitions
- `src/theme/theme.ts` - Theme configuration (typography, spacing, components)

### Using Theme Toggle

The theme mode is persisted in localStorage and can be toggled using the `ThemeToggle` component in the app bar.

```tsx
import { ThemeToggle } from '@components/ThemeToggle';

// Use in your component
<ThemeToggle />;
```

### Custom Theme Hook

```tsx
import { useThemeMode } from '@hooks/useThemeMode';

function MyComponent() {
  const { mode, toggleTheme } = useThemeMode();

  return <button onClick={toggleTheme}>Current mode: {mode}</button>;
}
```

## 🔌 React Query Usage

The project uses React Query for data fetching and state management.

### Example Service

```tsx
// src/services/productService.ts
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.get<Product[]>('/products'),
  });
};

// Usage in component
function ProductList() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* render products */}</div>;
}
```

## 🎭 API Mocking with MSW

The project uses [Mock Service Worker (MSW)](https://mswjs.io/) for API mocking in both tests and development.

### Enable Mocking in Development

Run with mocked API:

```bash
npm run dev:mock
```

Or set environment variable:

```bash
# .env
VITE_ENABLE_API_MOCKING=true
```

### Automatic Mocking in Tests

All tests automatically use mocked API responses. No configuration needed!

### Mock Data

Mock data is defined in `src/mocks/data/`:

- Products
- Orders
- Customers

### Adding New Endpoints

1. Add mock data to `src/mocks/data/`
2. Add handler to `src/mocks/handlers.ts`
3. Create service with React Query hooks

Example:

```typescript
// src/mocks/handlers.ts
http.get(`${API_URL}/categories`, async () => {
  await simulateDelay();
  return HttpResponse.json(mockCategories);
}),
```

### Testing with Custom Responses

```typescript
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';

it('should handle 404 error', async () => {
  server.use(
    http.get('http://localhost:3000/api/products/999', () => {
      return new HttpResponse(null, { status: 404 });
    })
  );

  // ... test code
});
```

### Test Utilities

Helper functions in `src/utils/test-server-utils.ts`:

```typescript
import {
  mock404Error,
  mock500Error,
  mockDelayedResponse,
} from '@utils/test-server-utils';

// Simulate errors
mock404Error('/products/999');
mock500Error('/products');

// Simulate slow network
mockDelayedResponse('/products', 2000, mockProducts);
```

For detailed documentation, see [src/mocks/README.md](src/mocks/README.md).

## 🧭 React Router

The app uses React Router v6 with the Data Router API for better data loading patterns.

### Adding New Routes

Edit `src/router.tsx`:

```tsx
{
  path: 'new-page',
  element: <NewPage />,
  loader: async () => {
    // Optional: Load data before rendering
    return fetchData();
  },
}
```

## 🧪 Testing

### Running Tests

```bash
npm run test        # Watch mode
npm run test:ui     # With UI
npm run test:coverage  # With coverage
```

### Writing Tests

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 🔧 Path Aliases

The project uses path aliases for cleaner imports:

- `@/` - src directory
- `@components/` - components directory
- `@pages/` - pages directory
- `@hooks/` - hooks directory
- `@services/` - services directory
- `@utils/` - utils directory
- `@types/` - types directory
- `@theme/` - theme directory

### Usage

```tsx
import { ThemeToggle } from '@components/ThemeToggle';
import { useProducts } from '@services/productService';
import { api } from '@utils/api';
```

## 🛠️ Development Workflow

1. **Create a new feature branch**

   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Write code following the established patterns
   - Add tests for new features
   - Ensure all tests pass

3. **Commit your changes**
   - Pre-commit hooks will automatically run ESLint and Prettier
   - Fix any issues before committing

4. **Push and create a pull request**
   ```bash
   git push origin feature/my-feature
   ```

## 📝 Code Quality

### ESLint

ESLint is configured with TypeScript, React, and React Hooks rules. Run:

```bash
npm run lint        # Check for errors
npm run lint:fix    # Auto-fix errors
```

### Prettier

Prettier handles code formatting. Run:

```bash
npm run format       # Format all files
npm run format:check # Check formatting
```

### Pre-commit Hooks

Husky and lint-staged run automatically before commits to ensure code quality.

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_ENV=development
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [React Query Documentation](https://tanstack.com/query/)
- [Vitest Documentation](https://vitest.dev/)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

---

Built with ❤️ using modern web technologies
