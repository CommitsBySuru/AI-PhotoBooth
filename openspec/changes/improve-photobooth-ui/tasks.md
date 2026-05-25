## 1. Markup Structure

- [x] 1.1 Remove inline CSS from `index.html` and rely on `style.css` for presentation.
- [x] 1.2 Rework `index.html` into semantic regions for header, camera preview, status, controls, and strip preview.
- [x] 1.3 Add DOM targets for camera status, capture progress, and action availability messaging.

## 2. Visual Design

- [x] 2.1 Build a responsive desktop layout that keeps camera, controls, and strip preview visually distinct.
- [x] 2.2 Add mobile styles so the app reflows without horizontal scrolling or overlapping UI.
- [x] 2.3 Style buttons, selects, video preview, placeholders, captured images, and disabled states consistently.
- [x] 2.4 Give empty and filled strip slots a deliberate photo booth strip presentation.

## 3. UI State Behavior

- [x] 3.1 Track camera readiness and disable capture when the camera is unavailable.
- [x] 3.2 Centralize UI state updates for capture count, strip completion, retry availability, and download availability.
- [x] 3.3 Update template creation and photo count changes to reset progress, placeholders, and controls.
- [x] 3.4 Replace avoidable alert-only flows with persistent status feedback while preserving useful validation.

## 4. Capture And Download Preservation

- [x] 4.1 Preserve filter application during photo capture.
- [x] 4.2 Preserve retry behavior for removing the most recent photo.
- [x] 4.3 Preserve PNG strip download behavior for the current captured photos.

## 5. Verification

- [x] 5.1 Manually verify desktop layout with camera, controls, and strip visible without overlap.
- [x] 5.2 Manually verify mobile-width layout does not require horizontal scrolling.
- [x] 5.3 Verify disabled and enabled states for capture, retry, and download across empty, partial, complete, and camera-error states.
- [x] 5.4 Verify capturing, retrying, changing strip size, applying filters, and downloading still work.
