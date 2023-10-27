import { FunctionComponent } from "react";
import "./style.css";
import Card from "@mui/material/Card";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
const Login: FunctionComponent = () => {
  const [value, setValue] = React.useState("login");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Card className="loginCard">
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="login" control={<Radio />} label="Log in" />
          <FormControlLabel
            value="signup"
            control={<Radio />}
            label="Sign up"
          />
        </RadioGroup>
      </FormControl>
      {value === "signup" ? (
        <div className="loginContainer">
          <TextField className="textField" label="name"></TextField>
          <TextField
            type="email"
            className="textField"
            label="email"
          ></TextField>
          <TextField
            type="password"
            className="textField"
            label="password"
          ></TextField>
          <TextField
            type="password"
            className="textField"
            label="repeat password"
          ></TextField>
          <Button className="loginButton" variant="contained">
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="loginContainer">
          <TextField
            type="email"
            className="textField"
            label="email"
          ></TextField>
          <TextField
            type="password"
            className="textField"
            label="password"
          ></TextField>
          <Button className="loginButton" variant="contained">
            Login
          </Button>
        </div>
      )}
    </Card>
  );
};
export default Login;
