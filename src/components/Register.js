import { useState } from "react";
import { useHistory } from "react-router";

function Register(props) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// const [message, setMessage] = useState("");

	const baseURL = props.baseURL;
	const history = useHistory();

	function checkPassword() {
		password === confirmPassword
			? props.setErrorMessage("")
			: props.setErrorMessage("passwords do not match ya fool");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		checkPassword();
		// console.log("Line 24 in handleSubmit");

		//Sends an object to api/usersRouter POST Function containing {username, email, password}.
		const resp = await fetch(`${baseURL}users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
		// console.log("Line 37 in handleSubmit");

		// Receives back a single object containing {username, email, password, token}.
		const info = await resp.json();
		console.log(info);

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
			<p>{props.errorMessage}</p>
		</>
	);
}

export default Register;
