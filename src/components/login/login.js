import {useState} from "react";
import {
	Link,
	useNavigate,
} from "react-router-dom";

import {useAuth, getIp} from "../custom/useAuth";

export default function LoginPage() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(false) 
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const {signin,setToken,setUser, setMail} = useAuth();
	const getUser = (header,username) => {
		const data = {
			"email": username
		}
		fetch('http://localhost:4000/api/user/get_user',{method:"POST", body: JSON.stringify(data), headers:{'Content-Type': 'application/json','accept':'application/json'}})
		.then(res => res.json())
		.then(res => setUser(res))
	}
	const handleSubmit = async (event) => {
		
		event.preventDefault();
		const ip = await getIp()
		const data = {
			"email": username, 
			"password":password, //password
			"ip_address": ip //getIp()
		}
		// TODO: call the backend method to authentication
		const header = {'Content-Type': 'application/json','accept':'application/json'}
		const request = await fetch("http://localhost:4000/api/user/login ", {method: "POST", body: JSON.stringify(data),headers:header })
			.then(responseData => {
				return responseData;
			})
			.catch(errorData => {
				setError(true);
				 return errorData;
			} 
		)		
		const response = await request.json();
		console.log(response);
		if (response.error !== null){
			if(response.error === "the IP is not registered"){
				setMail(username)
				navigate('/code')
			}
			setErrorMessage(response.error);
			setError(true);
		}

		if (response.messaje === 'welcome'){
			setToken(response.data.access.Token)
			getUser(header,username)
			localStorage.setItem("token",response.data.access.Token)
			signin(() => navigate("/dashboard"));
		}
	};

	return (
		<form className="form" onSubmit={(event) => handleSubmit(event)}>
			<h3>Login</h3>
			<input
				type="text"
				placeholder="Enter username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Login</button>
			{
				error && <h3 className="error"> {errorMessage} </h3>
			}
			<Link className="link" to="/forgetpassword">
				{" "}
				Forget Password
			</Link>
		</form>
	);
}