import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function AppBar() {
  type Page = "home" | "progress" | "emergency" | "settings";

  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    console.log(`Navigating to: ${page}`);
    // Add your navigation logic here (e.g., React Router)
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 w-full z-50">
      {/* Left Side: App Name */}
      <div className="text-xl font-bold text-blue-600">NeuroTracker</div>

      {/* Center: Navigation Links */}
      <div className="flex gap-6">
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === "home"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleNavigation("home")}
> <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Home
      </a>
        </button>


        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === "home"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleNavigation("home")}
> <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Progress
      </a>
      </button>

        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === "home"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleNavigation("home")}
> <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Emergency Contact
      </a>
        </button>
        
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === "home"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleNavigation("home")}
> <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Setting
      </a>
        </button>
      </div>

      {/* Right Side: Google Login */}
      <div className="ml-auto">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
          theme="filled_blue"
          shape="pill"
          size="medium"
          text="signin_with"
        />
      </div>
    </div>
  );
}

export default AppBar;
