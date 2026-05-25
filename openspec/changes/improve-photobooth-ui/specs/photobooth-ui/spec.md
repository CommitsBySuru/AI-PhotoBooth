## ADDED Requirements

### Requirement: Responsive Booth Layout
The photo booth UI SHALL present the live camera, controls, and strip preview in a polished responsive layout that remains usable on desktop and mobile viewport widths.

#### Scenario: Desktop layout separates primary regions
- **WHEN** the app is viewed on a desktop-width viewport
- **THEN** the live camera, controls, and photo strip preview are visually distinct and simultaneously visible without overlapping

#### Scenario: Mobile layout remains usable
- **WHEN** the app is viewed on a narrow mobile-width viewport
- **THEN** the interface stacks or reflows so the video, controls, and strip preview fit within the viewport width without horizontal scrolling

### Requirement: Camera Readiness Feedback
The photo booth UI SHALL communicate camera readiness and prevent capture attempts when the camera stream is not available.

#### Scenario: Camera stream is ready
- **WHEN** browser camera access succeeds
- **THEN** the interface shows a ready state and enables photo capture controls

#### Scenario: Camera stream is unavailable
- **WHEN** browser camera access fails or is denied
- **THEN** the interface shows a visible error or unavailable state and disables photo capture controls

### Requirement: Capture Progress Feedback
The photo booth UI SHALL show the selected strip size, current capture progress, and clear placeholder states for remaining photos.

#### Scenario: Template initializes
- **WHEN** the user selects a strip size
- **THEN** the strip preview displays the matching number of empty photo slots with clear ordering

#### Scenario: Photo is captured
- **WHEN** the user captures a photo
- **THEN** the next available slot is filled and the progress display updates to reflect the number of captured photos

#### Scenario: Strip is complete
- **WHEN** all selected photo slots are filled
- **THEN** the interface communicates completion and prevents additional captures until the user retries or changes the strip size

### Requirement: Control Availability
The photo booth UI SHALL enable and disable primary actions according to the current photo strip state.

#### Scenario: No photos captured
- **WHEN** the strip has no captured photos
- **THEN** retry and download actions are disabled or visibly unavailable

#### Scenario: At least one photo captured
- **WHEN** the strip contains one or more captured photos
- **THEN** the retry action is available

#### Scenario: Download is ready
- **WHEN** the strip contains one or more captured photos
- **THEN** the download action is available and downloads the current strip

### Requirement: Polished Strip Presentation
The photo booth UI SHALL render empty and captured photo slots with a deliberate photo booth strip appearance.

#### Scenario: Empty slot presentation
- **WHEN** a photo slot has not been captured
- **THEN** the slot is styled as an intentional placeholder rather than plain text in an unstyled box

#### Scenario: Captured slot presentation
- **WHEN** a photo slot contains a captured image
- **THEN** the captured photo fills its frame cleanly while preserving the strip layout

### Requirement: Maintainable Styling
The photo booth UI SHALL keep presentation styling in the external stylesheet rather than duplicating page-level styles inline.

#### Scenario: Page styles are maintained
- **WHEN** the UI implementation is updated
- **THEN** layout, typography, colors, spacing, and interactive styling are defined in `style.css`
