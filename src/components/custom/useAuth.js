import React, {
	useContext,
	createContext,
	useState,
	useEffect,
} from "react";
require('dotenv').config()
const host = process.env.HOST_BACKEND
const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
		fakeAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
export async function getRol(role){
	const rol = await fetch(`${host}/api/roles/getRol/${role}`, {method:"POST", body: JSON.stringify(role), headers:{'Content-Type': 'application/json','accept':'application/json'}})
		.then(data => { return data})
		.catch(error => {return error})
	const jsonRol = await rol.json()
	return jsonRol
	
}

 export async function getIp () {
	const res = await fetch('https://api.ipify.org?format=json')
		.then(res => {return res})
		.catch(err => {return err})
	const data = await res.json();
	const ip = data.ip;
	console.log(ip)
	return ip;
}


const authContext = createContext();

export default function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
	return useContext(authContext);
}

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [mail, setMail] =  useState(null)

	const signin = (cb) => {
		return fakeAuth.signin(() => {
			cb();
		});
	};

	const signout = (cb) => {
		return fakeAuth.signout(() => {
			setUser(null);
			cb();
		});
	};

	return {
		user,
		signin,
		signout,
		setToken,
		setUser,
		token,
		setMail,
		mail
	};
}