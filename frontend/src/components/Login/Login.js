import "./Login.css";
import Button from "@mui/material/Button";
import { auth, provider, signInWithPopup } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => dispatch(setUser(result.user)))
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
