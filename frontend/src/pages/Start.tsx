import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LeaderBoard } from "@/components/LeaderBoard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Start = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');

  const handleStartGame = () => {
    if (!isAuthenticated) {
      setAuthError('You must be logged in to start the game.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      navigate("/game");
    }, 1500);
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    const code = e.code;
    if (code === "Enter" || code === "Space" || code === "Digit1" || code === "Numpad1") {
      e.preventDefault();
      handleStartGame();
    }
    if (code === "Escape") {
      setShowInstructions(false);
    }
  };

  // Add keyboard listener
  useState(() => {
    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  });

  // Simulated login/register handlers (replace with real API calls)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (loginForm.username && loginForm.password) {
      try {
        const res = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: loginForm.username, password: loginForm.password })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          setIsAuthenticated(true);
          try { localStorage.setItem('polydash_username', loginForm.username); } catch (e) {}
          setShowLogin(false);
        } else {
          setAuthError(data.error || 'Login failed.');
        }
      } catch (err: any) {
        console.error('Login fetch error:', err);
        setAuthError(err?.message || 'Network error. Please try again.');
      }
    } else {
      setAuthError('Please enter username and password.');
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (registerForm.username && registerForm.password) {
      try {
        const res = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: registerForm.username, password: registerForm.password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setIsAuthenticated(true);
          try { localStorage.setItem('polydash_username', registerForm.username); } catch (e) {}
          setShowLogin(false);
        } else {
          setAuthError(data.error || 'Registration failed.');
        }
      } catch (err: any) {
        console.error('Register fetch error:', err);
        setAuthError(err?.message || 'Network error. Please try again.');
      }
    } else {
      setAuthError('Please enter username and password.');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#1a2a6c] via-[#1a1e3c] to-background">
      {/* Animated grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-65"
        style={{
          backgroundImage: 
            'linear-gradient(rgba(40, 80, 200, 0.18) 2px, transparent 2px), linear-gradient(90deg, rgba(40, 80, 200, 0.18) 2px, transparent 2px)',
          backgroundSize: '140px 140px, 140px 140px',
          animation: 'pan 30s linear infinite'
        }}
      />

      {/* Main card */}
      <main 
        className="relative w-full max-w-[680px] mx-4 p-7 rounded-[18px] backdrop-blur-lg animate-[card-appear_0.8s_ease-out]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45), inset 0 0 80px rgba(70, 120, 255, 0.15), inset 0 0 10px rgba(255,255,255,0.08)'
        }}
      >
        <div className="flex items-center flex-wrap gap-3 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-foreground" style={{ textShadow: '0 0 18px rgba(100,160,255,0.55)' }}>
            PolyDash
          </h1>
          <span 
            className="px-3 py-1.5 rounded-full text-sm bg-white/8 animate-[pulse-glow_2s_infinite]"
          >
            Arcade
          </span>
        </div>
        
        <p className="text-base md:text-lg opacity-85 mb-6 text-foreground/90">
          Fast-paced neon platforming. Avoid spikes, time your jumps, chase a new best score.
        </p>

        <div className="flex gap-3 flex-wrap mb-4">
          <Button
            onClick={handleStartGame}
            disabled={isLoading || !isAuthenticated}
            className="min-w-[170px] px-5 py-6 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:translate-y-[-2px] relative overflow-hidden group"
            style={{
              boxShadow: '0 10px 28px rgba(70,211,255,.35), inset 0 -2px 0 rgba(0,0,0,.15)',
              color: '#001'
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_0.5s]" />
            {isLoading ? "Loading..." : "Start Game"}
          </Button>
          <Button
            onClick={() => setShowInstructions(true)}
            variant="secondary"
            className="min-w-[170px] px-5 py-6 rounded-xl font-bold text-lg bg-gradient-to-r from-[#243b55] to-[#141e30] hover:opacity-90 transition-all hover:translate-y-[-2px]"
            style={{
              boxShadow: '0 10px 28px rgba(0,0,0,.35), inset 0 -2px 0 rgba(255,255,255,.05)'
            }}
          >
            How to Play
          </Button>
        </div>

        {/* Login/Register UI */}
        {!isAuthenticated && (
          <div className="mb-4 p-4 rounded-lg bg-white/10 shadow-lg flex flex-col gap-4">
            <div className="flex gap-4 mb-2">
              <button onClick={() => setShowLogin(true)} className={`px-4 py-2 rounded ${showLogin ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'}`}>Login</button>
              <button onClick={() => setShowLogin(false)} className={`px-4 py-2 rounded ${!showLogin ? 'bg-primary text-white' : 'bg-gray-700 text-gray-200'}`}>Register</button>
            </div>
            {showLogin ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <input type="text" placeholder="Username" value={loginForm.username} onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))} className="px-3 py-2 rounded bg-gray-900/80 text-white" />
                <input type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} className="px-3 py-2 rounded bg-gray-900/80 text-white" />
                <button type="submit" className="mt-2 px-4 py-2 rounded bg-primary text-white font-bold">Login</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-2">
                <input type="text" placeholder="Username" value={registerForm.username} onChange={e => setRegisterForm(f => ({ ...f, username: e.target.value }))} className="px-3 py-2 rounded bg-gray-900/80 text-white" />
                <input type="password" placeholder="Password" value={registerForm.password} onChange={e => setRegisterForm(f => ({ ...f, password: e.target.value }))} className="px-3 py-2 rounded bg-gray-900/80 text-white" />
                <button type="submit" className="mt-2 px-4 py-2 rounded bg-primary text-white font-bold">Register</button>
              </form>
            )}
            {authError && <div className="text-red-400 text-sm mt-1">{authError}</div>}
          </div>
        )}

        <div className="mt-6 mb-4">
          <LeaderBoard />
        </div>

        <div className="mt-4 text-xs opacity-55">
          Made for fun. Best experienced fullscreen.
        </div>
      </main>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/90 flex flex-col items-center justify-center gap-5 z-50">
          <div 
            className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"
          />
          <div className="text-lg">Loading PolyDash...</div>
        </div>
      )}

      {/* Instructions modal */}
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-card/95 to-card/90 border-border backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">How to Play PolyDash</DialogTitle>
            <DialogDescription asChild>
              <ul className="mt-4 space-y-3 text-base leading-relaxed text-foreground/90">
                <li>• Navigate your character through the neon obstacles</li>
                <li>• Press <span className="text-accent font-bold">Space</span> or <span className="text-accent font-bold">Up Arrow</span> to jump</li>
                <li>• Time your jumps carefully to avoid spikes and other hazards</li>
            
                <li>• Your score increases the further you progress</li>
                <li>• Try to beat your high score with each attempt!</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-4">
            Tip: Use fullscreen mode for the best gaming experience.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Start;
