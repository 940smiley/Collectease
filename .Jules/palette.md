## 2025-05-14 - MUI Tooltip with Disabled Elements
**Learning:** MUI Tooltips do not trigger on disabled elements because disabled elements do not emit mouse events.
**Action:** Wrap the disabled element in a `<span>` or `<div>` and apply the Tooltip to that wrapper to ensure accessibility and state feedback are preserved.
