## 2025-05-15 - MUI Tooltip on Disabled Elements
**Learning:** MUI (and standard HTML) disabled elements do not trigger pointer events (hover, click), which prevents Tooltips from appearing.
**Action:** Wrap disabled interactive elements in a `<span>` or `<div>` to capture pointer events and ensure the Tooltip remains accessible even when the action is unavailable.
