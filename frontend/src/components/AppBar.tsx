import { GoogleLogin } from "@react-oauth/google";

function AppBar() {
  return (
    <GoogleLogin
        onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log("Login Failed");
        }}
        useOneTap
    />
  );
}

export default AppBar;
