import { useState } from "react";
import { useHistory } from "react-router";

const baseURL = `http://localhost:3000/api/`;

function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  function checkPassword() {
    password === confirmPassword
      ? setMessage("")
      : setMessage("passwords do not match ya fool");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    checkPassword();
    const resp = await fetch(`http://localhost:3000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const info = await resp.json();
    console.log(info);
    //localStorage.setItem("token", )
    // setUsername({
    //   username: info.user.username,
    //   email: info.user.email,
    // });
    history.push("/");
  }
  return (
    <>
      <h2>Registering a new user!</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          minLength={4}
          type={"text"}
          placeholder={"enter a username"}
          value={username}
        ></input>
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
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          type={"password"}
          placeholder={"verify password"}
          value={confirmPassword}
        ></input>
        <button>Register New User</button>
      </form>
      <p>{message}</p>
    </>
  );
}

export default Register;
