import { useState } from "react";

function NavBar() {
  type Page = "home" | "progress" | "settings";
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    setMenuOpen(false); // Close the menu after selection
    console.log(`Navigating to: ${page}`);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold text-blue-600">NeuroTracker</div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? (
            <div className="material-symbols-outlined">menu</div>
          ) : (
            <div className="material-symbols-outlined">close</div>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-2 p-4">
          <button
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              currentPage === "home"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("home")}
          >
            Home
          </button>
          <button
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              currentPage === "progress"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("progress")}
          >
            Progress
          </button>
          <button
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              currentPage === "settings"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("settings")}
          >
            Settings
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
