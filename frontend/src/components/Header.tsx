import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full mx-auto py-6 px-4 shadow">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          AiToHuman
        </Link>
      </div>
    </header>
  );
}