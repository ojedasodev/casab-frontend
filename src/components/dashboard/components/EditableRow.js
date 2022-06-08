import React from "react";

const EditableRow = ({
    user,
    editRol,
    handleEditFormChange,
    handleCancelOnClick
}) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
      <select id="cars" name="cars">
        <option value="administrador">administrador</option>
        <option value="invitado" selected>invitado</option>
      </select>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelOnClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;