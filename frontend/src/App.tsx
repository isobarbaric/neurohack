import { GoogleLogin } from "@react-oauth/google"; 
import { User, OAuthUser } from "./types/user";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Recorder from "./components/Recorder";
import { BrowserRouter as Router, Routes, Route, useNavigation } from 'react-router-dom';
import AudioPage from './pages/AudioPage'
import VideoPage from './pages/VideoPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from "./pages/DashboardPage";
import NavBar from './components/NavBar'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState<User | null>(null)

  const handleSuccess = (credentialResponse: any) => {
	console.log("here");
	if (credentialResponse.credential) {
	  const decodedUser = jwtDecode(credentialResponse.credential) as OAuthUser;
	  setUser({
		email: decodedUser.email! || "DNE",
		lastName: decodedUser.family_name! || "DNE",
		firstName: decodedUser.given_name! || "DNE",
		image: decodedUser.picture! || "DNE",
	  });
	  console.log("hello");
	}
  };

  return (
	<>
	  <NavBar user={user} setUser={setUser}/>
	  <div
		style={{
		  display: "flex",
		  flexDirection: "column",
		  alignItems: "center",
		  justifyContent: "center",
		  minHeight: "100vh",
		  backgroundColor: "#FFDAB9",
		  padding: "16px",
		}}
	  >
		<h1
		  style={{
			fontSize: "2rem",
			fontWeight: "bold",
			color: "#5D4037",
			marginBottom: "16px",
		  }}
		>
		  Welcome to NeuroTracker
		</h1>
		<ul className="list-disc text-left mb-8">
		  <li className="text-lg text-darkBrown mb-2">
			Monitor your progress over time with our AI-powered agent.
		  </li>
		  <li className="text-lg text-darkBrown mb-2">
			Receive personalized feedback to enhance your well-being.
		  </li>
		  <li className="text-lg text-darkBrown mb-2">
			Access comprehensive tools designed for your health journey.
		  </li>
		</ul>
		{!user ? 
		  <GoogleLogin
			onSuccess={(credentialResponse) => {
			  handleSuccess(credentialResponse);
			}}
			onError={() => {
			  console.log("Login Failed");
			}}
		  /> : 
		  <>
			<Link to="/recordAudio" className="text-white hover:text-gray-200">
			  Record Audio
			</Link>
			<Link to="/recordVideo" className="text-white hover:text-gray-200">
			  Record Video
			</Link>
		  </>
		}
	  </div>
	</>
  );
};

export default App;
