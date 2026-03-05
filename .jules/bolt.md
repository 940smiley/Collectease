## 2025-05-15 - [Import/Export Optimization]
**Learning:** Sequential file reading with `FileReader` and multiple state updates in a loop is a significant performance bottleneck and leads to technically incorrect state transitions (side effects in pure state updaters). Using `Promise.all` for concurrent reads and batching state updates is much more efficient.
**Action:** Always prefer `Promise.all` for bulk asynchronous operations like file imports and ensure state updates are functional and atomic.

## 2025-05-15 - [Route-based Code Splitting]
**Learning:** Implementing `React.lazy` for all routes significantly reduces the initial bundle size (by ~70kB in this case) and improves initial load time.
**Action:** Use `React.lazy` and `Suspense` for page-level components by default in large applications.
