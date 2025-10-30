import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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

      <div className="text-center relative z-10 px-4">
        <h1 className="text-8xl md:text-9xl font-bold mb-4 text-primary" style={{ textShadow: '0 0 30px rgba(70,211,255,0.6)' }}>
          404
        </h1>
        <p className="text-2xl md:text-3xl mb-8 text-foreground/90">
          Oops! Page not found
        </p>
        <Link to="/">
          <Button 
            className="min-w-[170px] px-5 py-6 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:translate-y-[-2px]"
            style={{
              boxShadow: '0 10px 28px rgba(70,211,255,.35)',
              color: '#001'
            }}
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
