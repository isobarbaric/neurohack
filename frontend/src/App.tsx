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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordWhich, setRecordWhich] = useState<"audio" | "video" | null>(null);

  const openModal = (modalName: "audio" | "video") => {
	setIsModalOpen(true);
	setRecordWhich(modalName);
  }
  const closeModal = () => setIsModalOpen(false);

  interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ children }) => {
	if (!isModalOpen) return null;

	return (
	  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		{/* Modal Content */}
		<div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
		  {/* Close Button */}
		  <button
			onClick={closeModal}
			className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
		  >
			&times;
		  </button>
		  {children}
		</div>
	  </div>
	);
  };


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
			<button
			  onClick={()=>openModal("video")}
			  className="bg-blue-500 text-white px-4 py-2 my-2 rounded"
			>
			  Record Video
			</button>
			 <button
				onClick={()=>openModal("audio")}
				className="bg-blue-500 text-white px-4 py-2 my-2 rounded"
			  >
				Record Audio
			  </button>
		  </>
		}

		<Modal isOpen={isModalOpen} onClose={closeModal}>
		  <h2 className="text-xl font-bold mb-4">Modal Title</h2>
		  <p>This is the content of the modal.</p>
		  {recordWhich=="audio" ?
			<p>audio</p> :
			<p>video</p>
		  }
		  <button
			onClick={closeModal}
			className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
		  >
			Close
		  </button>
		</Modal>

	  </div>
	</>
  );
};

export default App;
