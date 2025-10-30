# PolyDash 🎮

A fast-paced neon platformer built with React and Canvas. Time your jumps, avoid hazards, and race for high scores!

## Features

- 🌟 Neon-styled geometric platforming
- 🎯 Precise jumping mechanics
- 💾 Manual and automatic checkpoints
- 🏆 High score tracking
- 🎵 Background music and sound effects
- 🔐 User authentication
- 📱 Responsive design

## Tech Stack

- Frontend:
  - React 18
  - TypeScript
  - Vite
  - TailwindCSS
  - Canvas API
- Backend:
  - Node.js
  - Express
  - MongoDB (for user accounts and scores)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Krishgit2005/game.git
cd game
```

2. Start the backend (optional, needed for auth & scores):
```bash
cd backend
npm install
npm start
```

3. Start the frontend:
```bash
cd frontend
npm install
npm run dev
```

4. Open http://localhost:5173 in your browser

## How to Play

- **Space** or **Up Arrow**: Jump
- **S**: Place manual checkpoint
- **P**: Pause game
- **R**: Restart level
- **ESC**: Quit to menu

Tips:
- Hold Space to chain multiple jumps
- Use checkpoints strategically - they save your progress and score
- Watch out for red spikes!
- Try to beat your high score with each run

## Development

### Project Structure

```
game/
├── backend/          # Express server
│   ├── config/      # Database configuration
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API endpoints
│   └── server.js    # Server entry
└── frontend/        # React application
    ├── public/      # Static assets
    ├── src/
    │   ├── components/  # React components
    │   ├── lib/        # Game engine & utilities
    │   └── pages/      # Main game pages
    └── index.html
```

### Key Files

- `frontend/src/lib/game-engine.js`: Core game mechanics, physics, and rendering
- `frontend/src/pages/Game.tsx`: Game canvas and UI integration
- `frontend/src/pages/Start.tsx`: Main menu and authentication
- See `frontend/FRONTEND_DOCUMENTATION.md` for detailed documentation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

## Credits

- Game engine & original code by [Your Name]
- Sound effects from [Source]
- Background music: "Inception" by White Bat Audio