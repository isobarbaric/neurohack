import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </AuthProvider>
  );
}

export default App;
