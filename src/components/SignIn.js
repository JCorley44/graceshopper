import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = props.baseURL;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Line 22 in handleSubmit");

    //Sends an object to api/usersRouter POST Function containing {username, email, password}.

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
    // console.log("Line 35 in handleSubmit");

    // Receives back a single object containing {username, email, password, token}.
    const info = await resp.json();
    //console.log(info);

    //Sets token in Local Storage.
    localStorage.setItem("token", info.token);

    //user and setUser are passed from app.js as props. Here we are setting the user state with the user information.
    props.setUser({
      id: info.id,
      username: info.username,
      email: info.email,
      token: info.token,
    });

    //Sending us back to the Home page.
    history.push("/");
  };

  return (
    <>
      <h2>Sign into your account!</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          minLength={8}
          type={"text"}
          placeholder={"enter email address"}
          value={email}
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          type={"password"}
          placeholder={"enter password"}
          value={password}
        ></input>
        <button>Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
