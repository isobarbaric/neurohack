import { GoogleLogin } from "@react-oauth/google";
import { User, OAuthUser } from "../types/user";
import { jwtDecode } from "jwt-decode";

interface LandingPageProps {
  userRef:  React.RefObject<User | null>;
}

const LandingPage: React.FC<LandingPageProps> = ({ userRef }) => {
  const handleSuccess = (credentialResponse: any) => {
    console.log("here");
    if (credentialResponse.credential) {
      const decodedUser = jwtDecode(credentialResponse.credential) as OAuthUser;
      userRef.current = ({
        email: decodedUser.email! || "DNE",
        lastName: decodedUser.family_name! || "DNE",
        firstName: decodedUser.given_name! || "DNE",
        image: decodedUser.picture! || "DNE",
      });
      console.log("hello");
	  console.log(userRef.current)
    }
  };

  return (
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
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleSuccess(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default LandingPage;
