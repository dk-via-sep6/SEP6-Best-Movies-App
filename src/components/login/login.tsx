import { FunctionComponent, useState } from "react";
import "./style.css";
import Card from "@mui/material/Card";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import logo from "../../assets/images/best_movie_192x192.png";
import {
  login,
  signInAnonymously,
  signInWithGoogle,
  signUp,
} from "../../hooks/useAuth";
import GoogleIcon from "@mui/icons-material/Google"; // Import Google icon
import IncognitoIcon from "@mui/icons-material/VisibilityOff"; // Example icon for anonymous login
const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const validateInputs = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (value === "signup" && password !== repeatPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      try {
        await signUp(email, password);
        navigate("/movies");
      } catch (error: any) {
        setError(error.message);
      }
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/movies");
    } catch (error) {
      console.error(error);
      // Handle errors here, such as displaying a notification to the user
    }
  };
  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously();
      navigate("/movies");
    } catch (error) {
      console.error(error);
      // Handle errors here, such as displaying a notification to the user
    }
  };
  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        await login(email, password);
        navigate("/movies");
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="loginContainer">
      <img className="loginLogo" src={logo} alt="logo" />
      <Card className="loginCard">
        {error && <p className="errorMessage">{error}</p>}{" "}
        {/* Display error messages */}
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="login"
              control={<Radio />}
              label="Log in"
            />
            <FormControlLabel
              value="signup"
              control={<Radio />}
              label="Sign up"
            />
          </RadioGroup>
        </FormControl>
        {value === "signup" ? (
          <div className="loginContent">
            <TextField
              type="text"
              className="textField"
              label="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <TextField
              type="email"
              className="textField"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              className="textField"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password"
              className="textField"
              label="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button
              className="loginButton"
              variant="outlined"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button
              className="loginButton"
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
            >
              Login with Google
            </Button>
            <Button
              className="loginButton"
              variant="outlined"
              onClick={handleAnonymousSignIn}
              startIcon={<IncognitoIcon />}
            >
              Continue Anonymously
            </Button>
          </div>
        ) : (
          <div className="loginContent">
            <TextField
              type="email"
              className="textField"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              className="textField"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="loginButton"
              variant="outlined"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              className="loginButton"
              startIcon={<GoogleIcon />}
              variant="outlined"
              onClick={handleGoogleSignIn}
            >
              Login with Google
            </Button>
            <Button
              className="loginButton"
              variant="outlined"
              onClick={handleAnonymousSignIn}
              startIcon={<IncognitoIcon />}
            >
              Continue Anonymously
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
