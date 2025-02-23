import { GoogleLogin } from "@react-oauth/google";
import { User, OAuthUser } from "./types/user";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Dashboard } from "./Dashboard";
import AppBar from "./components/AppBar";
import Recorder from "./components/Recorder";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSuccess = (credentialResponse: any) => {
    console.log("here");
    console.log(credentialResponse);
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

  const handleError = () => {
    console.log("Login failed");
  };

  // const login = useGoogleOneTapLogin({
  //   onSuccess: (credentials) => handleSuccess(credentials),
  //   onError: () => handleError(),
  // });

  return (
    <>
      {!user && (
<<<<<<< Updated upstream
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
=======
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
          {/* <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              backgroundColor: "#FFB07C",
              color: "#5D4037",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            onClick={() => login}
          >
            <svg
              className="w-6 h-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.1 0 5.2 1.3 6.4 2.4l4.7-4.7C32.2 4.7 28.6 3 24 3 14.8 3 7.3 9.8 5.1 18.5l5.7 4.4C12.7 15 17.9 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.6-.1-2.7-.3-3.9H24v7.4h12.9c-.5 3-2.1 5.5-4.5 7.2l5.7 4.4c3.3-3 5.4-7.5 5.4-12.6z"
              />
              <path
                fill="#FBBC05"
                d="M12.9 28.9c-.8-2.3-1.2-4.7-1.2-7.4s.4-5.1 1.2-7.4l-5.7-4.4C5.2 13.1 4 17 4 21.5s1.2 8.4 3.2 11.8l5.7-4.4z"
              />
              <path
                fill="#EA4335"
                d="M24 44c4.6 0 8.5-1.5 11.3-4.1l-5.7-4.4c-1.6 1.1-3.7 1.8-5.6 1.8-5.1 0-9.4-3.5-10.9-8.2l-5.7 4.4C7.3 38.2 14.8 44 24 44z"
              />
            </svg>
            Sign In With Google
          </button> */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleSuccess(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
>>>>>>> Stashed changes
      )}
      {user && <Dashboard user={user} />}
      <Recorder />
    </>
  );
};

export default App;
