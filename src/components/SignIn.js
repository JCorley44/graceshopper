import { useHistory } from "react-router";
import { useState } from "react";
import "../index.css";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = props.baseURL;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${baseURL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const info = await resp.json();
    console.log("25", info);

    //Sets the error message at the bottom of the form that will display if the log in information is not valid.
    if (info.username === undefined) {
      return props.setErrorMessage(info.message);
    }
    //Sets token in Local Storage.
    localStorage.setItem("token", info.token);

    //Setting the user state with the user information.
    props.setUser(info);
    // console.log(props.user);
    if (info.is_admin === true) {
      console.log("true");
      props.setUserAdmin("true");
    }

    //Used here as a reset for the error message if something has already triggered it to display. Without this it will continue displaying on every screen until some action causes it to be changed.
    props.setErrorMessage("");
    //Sending us back to the Home page.
    return history.push("/");
  };

  return (
    <>
      <h2>Sign into your account!</h2>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <input
            onChange={(e) => setEmail(e.target.value)}
            minLength={8}
            type={"text"}
            placeholder={"enter email address"}
            value={email}
          ></input>
        </div>
        <br></br>
        <div className="pass">
          <input
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            type={"password"}
            placeholder={"enter password"}
            value={password}
          ></input>
        </div>
        <br></br>
        <button>Sign In</button>
        <p>{props.errorMessage}</p>
      </form>
    </>
  );
}

export default SignIn;
