import { useState, useContext } from "react";
// import AuthContext from "../store/authContext";
import classes from "./Auth.module.css";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  // const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    // const url = 'http://localhost:4005'

    e.preventDefault();

    console.log("submitHandler called");

    const body = {
      username,
      password,
    };
  };

  //   axios.post(register ? `${url}/register` : `${url}/login`, body)
  //     .then((res) => {
  //       authCtx.login(res.data.token, res.data.exp, res.data.userId)
  //     })
  //     .catch((error) => {
  //       console.log('error', error)
  //       setUsername("");
  //       setPassword("");
  //     });

  // };

  return (
    <div className={classes.main}>
      <div className={classes.log_card}>
        <h2>WELCOME BACK!</h2>
        <div className={classes.log_content}>
          <form>
            {/* onSubmit={submitHandler}> */}
            <input
              className={classes.form_input}
              type="text"
              placeholder="username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
            <input
              className={classes.form_input}
              type="password"
              placeholder="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <button className={classes.form_btn}>
              {register ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
        <button
          className={classes.register_btn}
          onClick={() => setRegister(!register)}
        >
          Need to {register ? "Login" : "Sign Up"}?
        </button>
      </div>
    </div>
  );
};


export default Auth