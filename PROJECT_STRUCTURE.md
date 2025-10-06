# PolyDash - React + MongoDB Project Structure

This document explains the complete project structure after converting the original HTML/CSS/JavaScript game to React with MongoDB preparation.

## 📁 Project Overview

```
polydash/
├── src/                          # React frontend
│   ├── components/               # UI components (shadcn)
│   ├── lib/
│   │   └── game-engine.js       # Original game logic (UNCHANGED)
│   ├── pages/
│   │   ├── Start.tsx            # Start screen
│   │   ├── Game.tsx             # Game canvas page
│   │   └── NotFound.tsx         # 404 page
│   ├── App.tsx                  # Main routing
│   └── index.css                # Design system
│
├── backend/                      # MongoDB preparation (NOT CONNECTED YET)
│   ├── models/
│   │   └── Score.js             # Mongoose schema for scores
│   ├── config/
│   │   └── database.js          # MongoDB connection config
│   └── README.md                # Backend setup instructions
│
├── public/
│   └── images/
│       └── city-background.png  # Game background image
│
└── index.html                    # Entry point with SEO meta tags
```

## 🎮 Game Logic - COMPLETELY PRESERVED

**Location:** `src/lib/game-engine.js`

This file contains the **ORIGINAL** JavaScript game engine with:
- ✅ All mathematical classes (point, vector, polygon, etc.)
- ✅ All game physics and collision detection
- ✅ Canvas rendering logic
- ✅ Player controls and movement
- ✅ Obstacle generation and animation
- ✅ Audio management

**⚠️ IMPORTANT:** The game logic has NOT been modified. It runs exactly as it did in the original HTML version.

## 🎨 Frontend (React)

### Start Page (`src/pages/Start.tsx`)
- Converted from `start.html`
- Features:
  - Futuristic glass-morphism card design
  - Animated grid background
  - "Start Game" and "How to Play" buttons
  - Keyboard shortcuts (1, Enter, Space)
  - Loading animation
  - Instructions modal

### Game Page (`src/pages/Game.tsx`)
- Converted from `index.html`
- Features:
  - Canvas elements for game rendering
  - Dynamically imports the game engine
  - Provides all necessary DOM elements (canvases, images, audio)
  - Background image styling

### Design System (`src/index.css`)
- Futuristic gaming theme
- Color palette:
  - Primary: Cyan (#46d3ff)
  - Accent: Green (#3fff73)
  - Background: Deep navy (#0a0f2c)
  - Destructive: Orange (#ff6a00)
- Custom animations:
  - `pan` - Animated grid background
  - `pulse-glow` - Neon pulse effect
  - `shimmer` - Button hover effect
  - `card-appear` - Card entrance animation

## 🗄️ Backend (MongoDB) - PREPARED BUT NOT CONNECTED

### Score Model (`backend/models/Score.js`)
Mongoose schema with fields:
- `username` (String, required)
- `points` (Number, required)
- `date` (Date, default: now)

Includes:
- Validation rules
- Indexes for performance
- Usage examples in comments

### Database Config (`backend/config/database.js`)
- MongoDB connection function
- Event handlers (connected, disconnected, error)
- Graceful shutdown handling
- Environment variable support
- Usage instructions in comments

### How to Implement Backend
See `backend/README.md` for complete step-by-step instructions:
1. Install dependencies (express, mongoose, cors, dotenv)
2. Create server.js with API routes
3. Set up .env with MongoDB URI
4. Connect React frontend to API endpoints

## 🚀 Running the Project

### Development Mode
```bash
npm install
npm run dev
```

The app will open at `http://localhost:8080`

### Routes
- `/` - Start page
- `/game` - Game page
- `*` - 404 Not Found page

## 🎯 Key Features Maintained

✅ **Original game functionality completely preserved**
- Physics engine unchanged
- Collision detection intact
- Player controls working
- Audio system functional
- Canvas rendering identical

✅ **Enhanced with React**
- Component-based architecture
- React Router for navigation
- Modern build system (Vite)
- TypeScript support
- Hot module replacement

✅ **MongoDB ready for future**
- Schema defined
- Connection logic prepared
- Clear integration path
- No backend dependency for current functionality

## 📝 Notes

### Game Engine Integration
The game engine (`game-engine.js`) is imported dynamically in the Game component. It expects certain DOM elements to be present:
- `#canvas-game` - Main game canvas
- `#canvas-background` - Background canvas
- `#city` - Background image
- Audio elements for music and sound effects

### Styling Approach
All styles use the design system defined in `index.css`:
- Semantic HSL color tokens
- No hardcoded colors in components
- Consistent spacing and animations
- Responsive design

### TypeScript Considerations
The game engine remains in plain JavaScript (.js) to preserve the original logic. React components use TypeScript (.tsx) for type safety.

## 🔄 Migration Summary

| Original | Converted To | Status |
|----------|--------------|--------|
| start.html | src/pages/Start.tsx | ✅ Complete |
| index.html | src/pages/Game.tsx | ✅ Complete |
| impossible-game.js | src/lib/game-engine.js | ✅ Unchanged |
| styles.css | Merged into index.css | ✅ Complete |
| 123.png | public/images/city-background.png | ✅ Copied |
| MongoDB setup | backend/ folder | ✅ Prepared |

## 🎨 Design Tokens Reference

```css
/* Primary Colors */
--primary: hsl(192 100% 64%)      /* Cyan */
--accent: hsl(150 100% 62%)       /* Green */
--destructive: hsl(22 100% 50%)   /* Orange */

/* Background */
--background: hsl(224 55% 11%)    /* Deep navy */
--card: hsl(224 45% 14%)          /* Lighter navy */

/* Effects */
--gradient-primary: linear-gradient(90deg, cyan, green)
--shadow-neon: 0 10px 28px cyan/35%
```

## 📦 Dependencies Added
None! The project uses only the existing Lovable/React stack:
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router

The MongoDB packages (mongoose, express) are documented but not installed since the backend is not yet active.

## 🐛 Debugging

If the game doesn't load:
1. Check browser console for errors
2. Verify `src/lib/game-engine.js` exists
3. Ensure `public/images/city-background.png` is present
4. Check that canvas elements have correct IDs

## 📚 Next Steps

To complete the full-stack implementation:
1. Follow instructions in `backend/README.md`
2. Set up Express server
3. Connect to MongoDB
4. Create API endpoints
5. Integrate score submission in Game component
6. Add leaderboard display on Start page

---

**Built with React, designed for the future. Game logic unchanged, architecture improved.**
