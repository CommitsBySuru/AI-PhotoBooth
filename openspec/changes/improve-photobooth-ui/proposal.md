## Why

The current photo booth works, but the interface is sparse and inconsistent, with duplicated styling, limited guidance, and basic capture states that make the experience feel unfinished. Improving the UI now will make the app easier to use on desktop and mobile while giving captured strips a more deliberate photo booth look.

## What Changes

- Replace the plain layout with a responsive app interface that clearly separates the live camera, controls, and photo strip preview.
- Add polished visual treatment for the video preview, strip placeholders, captured photos, buttons, selects, and page background.
- Improve user feedback for camera access, capture progress, full strips, retry, and download availability.
- Consolidate styling into the external stylesheet so the UI is easier to maintain.
- Preserve the existing browser-only capture, retry, filter, photo count, and PNG download behavior.

## Capabilities

### New Capabilities

- `photobooth-ui`: Defines the user-facing photo booth interface, responsive layout, capture controls, preview strip presentation, and visual states.

### Modified Capabilities

None.

## Impact

- Affected files: `index.html`, `style.css`, and `app.js`.
- No backend, API, persistence, or build-system changes are expected.
- No new runtime dependencies are expected unless implementation chooses a small client-side helper for icons or rendering.
