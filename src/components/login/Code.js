import React, {
	useState,
	useEffect,
} from "react";
import {
	useNavigate,
} from "react-router-dom";

import {getIp, useAuth} from "../custom/useAuth";
require('dotenv').config()
const host = process.env.HOST_BACKEND

export default function CodePage(props) {
	const [code, setCode] = useState();
	const auth = useAuth();
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState()
	const navigate = useNavigate();   
	const user = auth.user;
	const {signin,setToken,setUser} = useAuth();

	useEffect(() => {
		if (user) navigate("/dashboard");
	});
	const getUser = (header,username) => {
		const data = {
			"email": username
		}
		fetch(`${host}/api/user/get_user`,{method:"POST", body: JSON.stringify(data), headers:{'Content-Type': 'application/json','accept':'application/json'}})
		.then(res => res.json())
		.then(res => setUser(res))
	}
	const handleSubmit = async(event) => {
		const ip = await getIp()
		event.preventDefault();
		const data = {
			"code": code,
			"ip_address": ip
		}
		
		const header = {'Content-Type': 'application/json','accept':'application/json'}
		const request = await fetch(`${host}/api/user/verification`, {method: "POST", body: JSON.stringify(data),headers:header })
			.then(responseData => {
				return responseData;
			})
			.catch(errorData => {
				setError(true);
				 return errorData;
			} 
		)		
		const response = await request.json();
		if(response.error){
			setError(true)
			setErrorMessage(response.error)
		}
    	if (response.error === "ok"){
			setError(false)
			setErrorMessage(response.error)
		}
        
		if (response.messaje === 'welcome'){
			setToken(response.data.access.Token)
			getUser(header,auth.mail)
			localStorage.setItem("token",response.data.access.Token)
			signin(() => navigate("/dashboard"));
		}
	};

	return (
		<form className="form" onSubmit={(event) => handleSubmit(event)}>
			<h3>Insert code</h3>
			<input
				type="text"
				placeholder="Enter code"
				onChange={(e) => setCode(e.target.value)}
				required
			/>

			<button type="submit">submit</button>
			{
				error && <h3>{errorMessage}</h3>
			}
		</form>
	);
}