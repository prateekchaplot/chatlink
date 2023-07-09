import "./Login.css";
import Button from "@mui/material/Button";
import { auth, provider, signInWithPopup } from "../../firebase.js";
// import { signInWithPopup } from "firebase/auth";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="logo512.png" alt="logo" />
        <div className="login__text">
          <h1>Sign in to ChatLink</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
