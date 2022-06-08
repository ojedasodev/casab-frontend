import React from "react";

const ReadOnlyRow = ({ user, handleEditClick}) => {
  return (
    <tr>
      
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.rol}</td>
    
        
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, user)}
        >
          Edit
        </button>

      </td>
    </tr>
  );
};

export default ReadOnlyRow;