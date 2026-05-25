## Context

The app is a static browser photo booth made from `index.html`, `style.css`, and `app.js`. It currently captures webcam frames, applies a selected CSS canvas filter, fills a vertical strip, supports retrying the last photo, and downloads a PNG strip. The UI is split between inline styles and an external stylesheet, and the current controls do not clearly communicate progress, camera readiness, or action availability.

## Goals / Non-Goals

**Goals:**

- Provide a polished, responsive interface for taking and reviewing a 3- or 4-photo strip.
- Make the camera, controls, strip preview, and status feedback visually distinct and easy to scan.
- Keep the existing no-build, browser-only architecture.
- Consolidate maintainable styling in `style.css`.
- Improve control states so users understand when capture, retry, and download actions are available.

**Non-Goals:**

- Add server-side storage, accounts, sharing, or cloud upload.
- Add a framework or build pipeline.
- Change the generated strip file format or core capture behavior beyond presentation and state clarity.
- Add advanced editing tools such as cropping, stickers, timers, or drag-and-drop rearranging.

## Decisions

- Use semantic static HTML with named app regions for camera, settings, actions, and strip preview. This keeps the app simple and accessible without introducing framework overhead. Alternative considered: rewriting as component-based JavaScript, which would add structure but is unnecessary for the current app size.
- Move all presentation rules to `style.css` and remove inline page styles. This creates one source of truth for layout, spacing, typography, responsive behavior, and interactive states. Alternative considered: keeping inline critical styles, but that would preserve the current maintenance problem.
- Represent progress and availability through DOM state and button states managed by `app.js`. This gives immediate feedback when the camera is unavailable, when no photo can be retried, when the strip is complete, and when the download is ready. Alternative considered: continuing to rely on alerts only, which interrupts the flow and hides persistent state.
- Keep generated images and downloads canvas-based. The existing capture pipeline is already browser-native and requires no external dependency. Alternative considered: using a rendering library, but the current strip composition is simple enough to maintain directly.

## Risks / Trade-offs

- Camera permission denial or unsupported media APIs may leave the page unusable -> show a persistent camera status message and disable capture until a stream is available.
- Responsive UI polish can accidentally change capture dimensions -> keep layout sizing separate from the canvas dimensions used for captured frames and downloads.
- Disabled controls can become confusing if state updates are missed -> centralize UI state updates after initialization, photo count changes, captures, retries, and camera errors.
- More visual styling can reduce readability on small screens -> use responsive grids, constrained widths, and high-contrast button and status treatments.
