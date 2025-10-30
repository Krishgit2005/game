import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartGame = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/game'), 250);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2a6c] via-[#1a1e3c] to-background">
      <main className="relative w-full max-w-[820px] mx-4 p-6 rounded-[18px] backdrop-blur-lg">
        <h1 className="text-5xl font-bold mb-4 text-foreground">PolyDash</h1>
        <p className="mb-6 text-foreground/85">Fast-paced neon platforming. Jump, dodge and try to beat your best.</p>

        <div className="flex gap-4 mb-6">
          <button onClick={handleStartGame} className="px-6 py-3 bg-primary text-black rounded font-bold">Start Game</button>
          <button onClick={() => setShowInstructions(true)} className="px-6 py-3 bg-gray-700 text-white rounded">How to Play</button>
        </div>

        {showInstructions && (
          <section className="bg-white/5 p-4 rounded">
            <h2 className="font-bold mb-2">How to Play</h2>
            <ul className="list-disc pl-5">
              <li>Press Space or Up Arrow to jump.</li>
              <li>Avoid obstacles and collect power-ups.</li>
              <li>Your score increases the farther you progress.</li>
            </ul>
            <button onClick={() => setShowInstructions(false)} className="mt-3 px-3 py-1 bg-primary text-black rounded">Close</button>
          </section>
        )}
      </main>
      {isLoading && <div className="fixed inset-0 flex items-center justify-center text-white">Loading...</div>}
    </div>
  );
};

export default Start;
