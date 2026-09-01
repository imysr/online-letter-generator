# Online Letter Generator

A personalised digital-letter platform where people create interactive gifts with stories, memory photos, animated flowers, and private letter reveals.

> **Status:** Early visual MVP. Payments, persistent storage, and private share links are not active yet.

## Current experiences

- **Player Two** — a cute pixel-game letter with story levels and achievement reveals.
- **The Special Edition** — a personalised editorial/newspaper letter.
- **A Garden for You** — a dreamy garden with animated flowers.
- **Graduation mode** — recipient details, journey story, memory album, achievement screen, and final letter.

Every finished theme will include the product's signature feature: **flowers that never wilt** — a theme-specific animated flower-gift section.

## Included in this milestone

- Responsive creator interface
- Live recipient, headline, message, and sender editing
- Theme selection and pricing preview
- Free-preview watermark
- Prototype checkout screen
- Player Two graduation recipient demo
- Local memory-photo selection (photos remain in the browser)

## Run locally

Open `index.html` in a modern browser. No installation is required. The immersive graduation demo is available at `demos/player-two-graduation.html`.

## Planned production architecture

- Secure authentication and private share links
- Private media storage with file limits and deletion controls
- Server-verified Malaysian payment gateway webhooks
- Publish/unlock states that cannot be bypassed by a browser redirect
- Animated flower builders for every theme
- Original K-pop-inspired themes without unlicensed artist media or branding

## Privacy and security

- Do not commit `.env` files or API keys.
- The current photo demo uses browser-local object data and uploads nothing.
- Production letters must default to private access.
- Payment status must be verified server-side before a paid letter is unlocked.

## Exclusivity note

The creator's private one-of-one F1 graduation letter is intentionally excluded from this public repository and will not be offered as a public template.

## Copyright

Copyright © 2026 Intan Maisara / imysr. All rights reserved. See `LICENSE`.
