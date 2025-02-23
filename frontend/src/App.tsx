import { GoogleLogin } from "@react-oauth/google";
import { User, OAuthUser } from "./types/user";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Recorder from "./components/Recorder";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigation,
} from "react-router-dom";
import AudioPage from "./pages/AudioPage";
import VideoPage from "./pages/VideoPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DrawingCanvas from "./components/Canvas";
import ModelResults from "./components/ModelResults";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whichModal, setWhichModal] = useState<
    "Canvas" | "Record Audio" | "Result Model" | null
  >(null);

  const openModal = (modalName: "Canvas" | "Record Audio") => {
    setIsModalOpen(true);
    setWhichModal(modalName);
  };
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
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
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
      <NavBar user={user} setUser={setUser} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#FFDAB9",
          padding: "50px",
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
          Welcome to NeuroTracker{user && `, ${user.firstName}`}
        </h1>
        <ul className="list-disc text-left mb-8">
          {user && (
            <>
              <li className="text-lg text-darkBrown mb-2">
                Complete your daily check-in below! Stay proactive in managing
                your health.
              </li>
              <li className="text-lg text-darkBrown mb-2">
                Keep track of your condition's progress to stay informed and
                motivated
              </li>
              <li className="text-lg text-darkBrown mb-2">
                Easily find and reach out to your healthcare provider when
                needed.
              </li>
            </>
          )}
          {!user && (
            <>
              <li className="text-lg text-darkBrown mb-2">
                Monitor your progress over time with our AI agent.
              </li>
              <li className="text-lg text-darkBrown mb-2">
                Receive personalized feedback to enhance your well-being.
              </li>
              <li className="text-lg text-darkBrown mb-2">
                Trigger warnings to your doctor in case your condition worsens.
              </li>
            </>
          )}
        </ul>
        {!user ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleSuccess(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        ) : (
          <>
            <button
              onClick={() => openModal("Canvas")}
              className="bg-blue-500 text-white px-4 py-2 my-2 rounded w-[300px]"
            >
              Record Drawing
            </button>
            <button
              onClick={() => openModal("Record Audio")}
              className="bg-blue-500 text-white px-4 py-2 my-2 rounded w-[300px]"
            >
              Record Audio
            </button>
          </>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">{whichModal}</h2>
          {whichModal == "Record Audio" && <Recorder />}
          {whichModal == "Canvas" && (
            <DrawingCanvas setIsModalOpen={setIsModalOpen} />
          )}
          {whichModal == "Result Model" && <ModelResults />}
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
