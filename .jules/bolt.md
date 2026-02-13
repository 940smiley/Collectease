## 2025-05-14 - Pure State Updaters and Side Effects
**Learning:** React state updater functions (the functional form of `setState`) must be pure. Executing side effects like `localStorage` writes or `alert()` calls inside them can lead to unexpected behavior, especially in Strict Mode or during concurrent rendering, where the updater might be called multiple times.
**Action:** Always perform side effects outside of the state updater function, either directly in the event handler (if appropriate) or within a `useEffect` hook that responds to state changes.
