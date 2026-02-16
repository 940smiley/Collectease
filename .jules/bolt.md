## 2026-02-16 - Side Effects in Functional State Updaters
**Learning:** Functional state updaters in React 19 must be pure. Performing side effects like `localStorage` operations or triggering other state updates inside `setX(prev => ...)` is an anti-pattern that can cause duplicate side effects or inconsistent state.
**Action:** Move side effects out of the updater function. In event handlers, compute the next value or use a microtask if the side effect depends on the result of a functional update.
