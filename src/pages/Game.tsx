import { useEffect, useRef, useState } from "react";

const Game = () => {
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cityImageRef = useRef<HTMLImageElement>(null);
  const cityReverseImageRef = useRef<HTMLImageElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement>(null);
  const deathSoundRef = useRef<HTMLAudioElement>(null);
  const jumpSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // This effect will initialize the game once the canvases are ready
    // The game engine script expects these elements to be available globally
    
    // Load and initialize the game engine
    const initGame = async () => {
      try {
        // Dynamically import the game engine
        await import("@/lib/game-engine.js");
        
        console.log("Game engine loaded successfully");
        
        // The game engine expects window.onload to trigger AtLoad()
        // Since we're dynamically loading it, we need to manually call AtLoad
        // Check if AtLoad function exists and call it
        if (typeof (window as any).AtLoad === 'function') {
          (window as any).AtLoad();
          console.log("Game initialized via AtLoad()");
        } else {
          console.error("AtLoad function not found in game engine");
        }
      } catch (error) {
        console.error("Failed to load game engine:", error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initGame, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup: stop any game loops if needed
      // The original game engine doesn't expose cleanup methods,
      // so we'll just let the browser handle it on unmount
    };
  }, []);

  // Pause state mirrored from the game engine
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const updater = setInterval(() => {
      // Read global gameState if available
      const gs = (window as any).gameState;
      if (gs && typeof gs.isPaused === "boolean") {
        setIsPaused(!!gs.isPaused);
      }
    }, 250);
    return () => clearInterval(updater);
  }, []);

  const handlePauseToggle = () => {
    const w = window as any;
    if (w && typeof w.pauseGame === "function" && typeof w.resumeGame === "function") {
      if (isPaused) w.resumeGame(); else w.pauseGame();
      // Optimistically update
      setIsPaused(!isPaused);
    }
  };

  const handleRestart = () => {
    const w = window as any;
    if (w && typeof w.restartGame === "function") {
      w.restartGame();
      // Reset local paused flag
      setIsPaused(false);
    }
  };

  return (
    <div 
      id="game-interface" 
      className="w-screen h-screen flex items-start overflow-hidden"
      style={{
        backgroundImage: 'url(/images/city-background.png)',
        backgroundSize: 'cover'
      }}
    >
      {/* Hidden assets that the game engine needs */}
      <div className="hidden">
        <img 
          id="city" 
          ref={cityImageRef}
          src="/images/city-background.png" 
          alt="City background"
        />
        <img 
          id="city-reverse" 
          ref={cityReverseImageRef}
          src="/images/city-background.png" 
          alt="City background reversed"
        />
        <audio id="backGroundMusic" ref={bgMusicRef}>
          <source src="https://www.dropbox.com/s/2t2sf02z7pt2y6v/White%20Bat%20Audio%20-%20Inception.mp3?raw=1" />
        </audio>
        <audio id="deathSound" ref={deathSoundRef}>
          <source src="https://www.dropbox.com/s/atqwpuraxkqj8au/esm_8bit_explosion_medium_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3?raw=1" />
        </audio>
        <audio id="jumpSound" ref={jumpSoundRef}>
          <source src="https://www.dropbox.com/scl/fi/lj1w3k7o8m76c3m4u0t7c/jump_07.wav?rlkey=7i2t1w9o5xq9d3l7d9sb0s3g8&raw=1" type="audio/wav" />
        </audio>
      </div>

      {/* Canvas container */}
      <div id="canvas-set" className="w-full relative">
        {/* Controls overlay */}
        <div className="absolute top-4 left-4 z-50 flex gap-2">
          <button
            onClick={handlePauseToggle}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
            aria-pressed={isPaused}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow"
          >
            Restart
          </button>
        </div>
        <canvas 
          id="canvas-game" 
          ref={gameCanvasRef}
          className="absolute block"
        />
        <canvas 
          id="canvas-background" 
          ref={bgCanvasRef}
          className="block z-[1]"
        />
      </div>
    </div>
  );
};

export default Game;
