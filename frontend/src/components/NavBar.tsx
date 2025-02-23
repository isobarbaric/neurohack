import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types/user";
import { googleLogout } from "@react-oauth/google";

interface NavBarProps {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const NavBar: React.FC<NavBarProps> = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    googleLogout();
	setUser(null);
  };

  return (
    <nav
      className="p-4 fixed w-full top-0 left-0 z-50"
      style={{ backgroundColor: "#D8B892" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">Neuro Track</div>

        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-2 mt-4">
		  {/*
          <Link to="/" className="text-white hover:text-gray-200">
            Landing Page
          </Link>
          <Link to="/recordAudio" className="text-white hover:text-gray-200">
            Record Audio
          </Link>
          <Link to="/recordVideo" className="text-white hover:text-gray-200">
            Record Video
          </Link>
		  */}
          {user && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200"
            > 
			  Log Out 
			</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
