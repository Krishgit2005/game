import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2a6c] via-[#1a1e3c] to-background text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="mb-6">Page not found</p>
        <Link to="/" className="px-4 py-2 bg-primary text-black rounded font-bold">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
