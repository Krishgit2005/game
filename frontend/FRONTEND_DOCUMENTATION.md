Frontend Documentation — PolyDash

Overview

This document describes the frontend of the PolyDash project (files under `frontend/`). It explains the role of the main files, where the login screen and game UI live, how the canvas-based game engine is integrated, and what changes were made to checkpoint/save behavior.

Contents
- App entry and routing
- Pages: Start (login), Game (canvas + overlays)
- Core engine: `src/lib/game-engine.js`
- UI components
- Checkpoint save and resume behavior (what was changed)
- How to run and test locally
- Notes & next steps

1) Project entry and routing

- `src/main.tsx`: React entry point. Mounts `<App />` into the `#root` element.
- `src/App.tsx`: Router setup — maps routes:
  - `/` → `src/pages/Start.tsx` (landing / login page)
  - `/game` → `src/pages/Game.tsx` (game canvas + overlays)
  - `*` → `src/pages/NotFound.tsx`

2) Pages (where the UX lives)

- `src/pages/Start.tsx`
  - Purpose: Landing and authentication UI. Start button and How to Play.
  - Login/Register: simple forms that POST to backend endpoints:
    - `POST /api/auth/login`
    - `POST /api/auth/register`
  - On successful login/register the code sets `isAuthenticated = true` and stores username in `localStorage.polydash_username`.
  - `handleStartGame()` prevents navigation to `/game` unless authenticated.
  - Keyboard shortcuts: `Enter`, `Space`, `Digit1` to start; `Escape` to close instructions.

- `src/pages/Game.tsx`
  - Purpose: Provide the DOM elements the old game engine expects, load the engine, and present small React overlays (Pause, Restart, Exit) that talk to the engine via `window` exposed methods.
  - Important DOM elements (ids must match the engine):
    - `#city`, `#city-reverse` — images used by the background drawing.
    - `#backGroundMusic`, `#deathSound`, `#jumpSound` — audio elements the engine uses.
    - `#canvas-game` — foreground canvas.
    - `#canvas-background` — background canvas.
    - `#game-interface` — container for the game.
  - Game integration flow:
    - `Game.tsx` dynamically imports `src/lib/game-engine.js` and calls `AtLoad()` if present.
    - It also hooks up a one-time user-gesture listener to allow background music playback.
  - Overlay controls (React-driven):
    - Pause/Resume — calls `window.pauseGame()` / `window.resumeGame()`.
    - Restart — calls `window.restartGame()`.
    - Exit — navigates back to `/`.
  - Pause state is read from `window.gameState` periodically.

3) Core engine — `src/lib/game-engine.js`

This is the original canvas-based game engine (plain JS). It contains:
- Geometry & physics classes (point, vector, polygon, square, hero, platform, peak, ending, checkPoint etc.).
- Grid handling and level creation.
- Rendering/drawing code (uses the two canvas elements and images referenced above).
- Input handling: updates a `keys` object via `keydown` / `keyup` listeners. `keyEventHandler` maps events into `keys[event.code]` and handles a few global shortcuts.
- Game loop: `game()` uses `requestAnimationFrame` to run physics/frame updates and draw frames.
- Checkpoint logic:
  - `addCheckPoint()` and `saveCheckPoint()` create/record checkpoints.
  - Manual: `KeyS` (press S) calls `saveCheckPoint()` (manual save).
  - Automatic: engine can auto-save when score thresholds in `checkpointScores` are reached (controlled by `automaticCheckpointsEnabled`).
- Global API the React UI uses:
  - `window.pauseGame`, `window.resumeGame`, `window.restartGame`, `window.gameState`, `window.AtLoad`, `window.setAutomaticCheckpoints`, `window.clearAutomaticCheckpoints`.

Recent changes (what I added/edited)
- Prevent automatic checkpoint saves when the Space key is held. This avoids accidental saves while the player holds Space to chain jumps. Implementation: the auto-save condition now requires `!keys.Space` before calling `saveCheckPoint()`.
- Save richer checkpoint metadata: the engine now stores a checkpoint object in `gameParameters.saved` with a `heroParams` array and `meta` object that includes `baseScore`, `startX`, `checkPointCounter`, `backGroundPosition`, `soundTime`, and `lastCheckPoint`. This allows the game to restore score and background/time state when resuming from a checkpoint.
- Update `restart(parameters)` to accept either the original initial-array or the saved checkpoint object, and to restore the saved `meta` values (score, startX, backGroundTimeScroll, sound time, checkpoint counter) and re-add the visual checkpoint into the grid when resuming.

4) UI components
- `src/components/ui/` contains many UI primitives (button, dialog, toaster, tooltip, etc.). These are standard React components used by the Start and Game pages.
- The `Button` component is in `src/components/ui/button.tsx` and is used in `Start.tsx` for consistent styling.

5) Where to change common behaviors
- To change the login flow: edit `src/pages/Start.tsx` (handleLogin/handleRegister). It currently expects a local dev backend at `http://localhost:4000`.
- To add/modify in-game buttons: edit `src/pages/Game.tsx` (React overlays) and/or `src/lib/game-engine.js` for global behavior.
- To alter checkpoint thresholds or disable automatic checkpoints: call `window.setAutomaticCheckpoints([...])` or `window.clearAutomaticCheckpoints()` from React — `Game.tsx` could expose a button to call these.

6) How to run & test locally
- Backend (optional but required if you want auth to work):
  - The repository has a `backend/` folder with `server.js` and routes. Start it so `/api/auth/*` responds.
- Frontend:
```powershell
cd 'd:\backup\New folder\game\frontend'
npm install
npm run dev
```
- Flow to test checkpoint resume:
  1. Start the frontend in a browser.
  2. Register / Login on the Start page (stores `polydash_username` in localStorage).
  3. Click Start Game to reach the canvas page.
  4. Press 'S' at a spot to create a manual checkpoint.
  5. Die (fall into hazard) — after the death animation, the engine should restart the hero at the saved checkpoint and restore score/background.
  6. Verify holding Space (to chain jumps) does not trigger automatic checkpoints (automatic checkpoints are blocked while Space is held).

7) Files of interest (quick list)
- `src/main.tsx` — app bootstrap
- `src/App.tsx` — routes
- `src/pages/Start.tsx` — login/start UI
- `src/pages/Game.tsx` — canvas + overlay controls
- `src/lib/game-engine.js` — core engine (drawing, physics, inputs, checkpoint logic)
- `src/components/ui/button.tsx` — button component used by Start
- `src/lib/utils.ts` — small helpers

8) Notes & next steps
- I modified the engine to better support resume-from-checkpoint; the changes are in `frontend/src/lib/game-engine.js`.
- Optionally, I can:
  - Add a React UI toggle to enable/disable automatic checkpoints.
  - Clean up `Start.tsx` where `gameParameters.saved` is assigned at startup to make the saved object shape consistent.
  - Run the dev server and perform a live end-to-end test (I can do this for you and report results).

If you'd like, I can also:
- Create a Word `.docx` (actual OOXML) with this content, or export a PDF. Right now I added this Markdown file plus a plain `.doc` version in the project so you can open it immediately.

---
Generated by your assistant. If you want the `.docx` (Office Open XML) packaged file, I can generate it next — confirm and I'll produce it and place it in the frontend folder.
