import React, { useMemo, useState, Fragment } from "react"
import { useNavigate } from "react-router-dom";
import EditableRow from "./EditableRow";
import DATA from "./MOCK_DATA_2.json";
import ReadOnlyRow from "./ReadOnlyRow";
import "./table.css"

export const RolTable = () => {

    const navigate = useNavigate()

    const users = useMemo(()=>DATA, []);
    const [addFormData, setFormData] = useState({rol:''})
   
    const [editRol, setEditRol] = useState({rol:''})

    const [editRolId , setRolId] = useState(null)

    const handleEditFormChange = (event) =>{
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editRol}
        newFormData[fieldName] = fieldValue
        
        setEditRol(newFormData)
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()

        const editedUserRol = {
            rol: editRol.rol
        }

        const newUserRol = [...users];

        const index = users.findIndex((user)=> user.id === editRolId);

        newUserRol[index] = editedUserRol;
        setFormData(newUserRol)
        setRolId(null)
    
    }

    const handleEditClick = (event, user)=>{
        event.preventDefault();
        setRolId(user.id);  // cambiar por id del rol en ves de el id del usuario

        const formValues = {
            rol: user.rol
        }

        setEditRol(formValues)
    }

    const handleCancelOnClick = (event) => {
        event.preventDefault()
        setRolId(null)
    }


    return (
        <form onSubmit={handleEditFormSubmit}>
        <table >
            <thead>
                <tr>
                    <th>Username</th>
                    <th>email</th>
                    <th>rol</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody> 
                {users.map((user)=>(
                        <Fragment>
                            {editRolId === user.id ? (
                            <EditableRow 
                            user={user} 
                            editRol={editRol} 
                            handleEditFormChange = {handleEditFormChange}
                            handleCancelOnClick = {handleCancelOnClick}/>
                            ) : (
                            <ReadOnlyRow user={user} handleEditClick={handleEditClick}/>
                            )}
                        </Fragment>
                    ))}
            </tbody>
        </table>
        </form>
    )
}