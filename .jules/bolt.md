# Bolt's Performance Journal

## 2025-05-22 - [Route-based Code Splitting]
**Learning:** Initial bundle size was unnecessarily large because all pages were imported directly in the main routes file.
**Action:** Use `React.lazy` and `Suspense` for all top-level route components to enable code splitting and reduce initial load time.

## 2025-05-22 - [Lazy State Initialization and Functional Updates]
**Learning:** Components reading from `localStorage` on every re-render can cause performance lag. Additionally, updating state by re-reading from storage is inefficient.
**Action:** Use lazy initialization for `useState` and functional updates for state to avoid redundant I/O operations.

## 2025-05-22 - [TypeScript and Verbatim Module Syntax]
**Learning:** Mixed imports of types and components (e.g., `import { ReactNode, Suspense } from 'react'`) can fail when `verbatimModuleSyntax` is enabled.
**Action:** Use `import { type ReactNode, Suspense }` to ensure compatibility with strict TypeScript configurations.
