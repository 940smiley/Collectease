## 2026-02-23 - LocalStorage and State Initialization
**Learning:** Reading from LocalStorage and parsing JSON in the top-level of a component's `useState` (e.g., `useState(getImagesFromSearchDB())`) causes the expensive synchronous I/O operation to run on every render, not just the initial one.
**Action:** Always use lazy initialization (the functional form: `useState(() => getImagesFromSearchDB())`) when initializing state from LocalStorage or other expensive sources.

## 2026-02-23 - Parallel Async File Reading
**Learning:** Sequential loops with `FileReader` can be inefficient and lead to multiple state updates if not handled carefully with counters.
**Action:** Wrap `FileReader` in Promises and use `Promise.all` to process files in parallel, updating state once with the aggregated results.
