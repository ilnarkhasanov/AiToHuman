import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full mx-auto py-6 px-4 shadow">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <img src="/logo.svg" alt="AiToHuman Logo" className="h-8 w-auto" />
          AiToHuman
        </Link>
      </div>
    </header>
  );
}