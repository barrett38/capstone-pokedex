import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [title, setTitle] = useState(""); // new state variable
  const [content, setContent] = useState(""); // new state variable
  const [status, setStatus] = useState(true); // new state variable
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data });

        // Add the new axios post request here
        axios
          .post(
            "/posts",
            { title, content, status, userId: res.data.userId }, // assuming res.data contains userId
            {
              headers: {
                authorization: res.data.token, // assuming res.data contains token
              },
            }
          )
          .then(() => {
            navigate("/profile");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        if (err.response.data) {
          alert(err.response.data);
        }
        console.error(err);
      });
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1 className="login-welcome">Welcome, Pokemon Master!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {register && (
          <div>
            <input type="checkbox" id="terms" name="terms" required />
            <label className="agree" htmlFor="terms">
              I agree to the terms and conditions
            </label>
          </div>
        )}
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
