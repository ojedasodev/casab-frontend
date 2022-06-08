import React, { useEffect, useState } from "react";
import { useAuth } from "../custom/useAuth";
import { Table } from "./components/Table";
require('dotenv').config()
const host = process.env.HOST_BACKEND
export default function UserInfo() {
	const auth = useAuth()
	const [users, setUsers] = useState()
	const getUsersToChange = () =>{
		fetch(`${host}/api/admin/get-users/${auth.token}`)
			.then(res => res.json())
			.then(data => {
				setUsers(data)
			})
	}
	useEffect(()=>{
		getUsersToChange()
	},[])
	return (
		<div className="profile">
			<h3>
				User Info
			</h3>
			<Table users={users}/>
		</div>
        
	);
}