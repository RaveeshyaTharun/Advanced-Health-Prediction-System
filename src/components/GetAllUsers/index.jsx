import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetUser.css'; // Make sure this path is correct

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/Register/getall");
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setEditedUserName(user.firstName); 
    setEditedEmail(user.email);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/v1/Register/edit/${editingUser._id}`, {
        firstName: editedUserName,
        email: editedEmail,
      });
      alert("User details updated successfully");
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert("Failed to update user details");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/Register/delete/${userId}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert("Failed to delete user");
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <a href="#">
        <svg xmlns="#" 
	          width="40"
	          height="40" fill="none" 
	          viewBox="0 0 40 40">
	          <path fill="#F06225" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path>
	          <path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
          </svg>
        </a>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li><a href="/admin">Back</a></li>
            <li><a href="/home">Logout</a></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>

      <div>
        <br />
        <table className="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.firstName}</td> 
                <td>{user.email}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-warning" 
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <div className="edit-user-modal">
            <h2>Edit User</h2>
            <label>
              User Name: 
              <input 
                type="text" 
                value={editedUserName} 
                onChange={(e) => setEditedUserName(e.target.value)} 
              />
            </label>
            <label>
              Email: 
              <input 
                type="email" 
                value={editedEmail} 
                onChange={(e) => setEditedEmail(e.target.value)} 
              />
            </label>
            <button onClick={updateUser} className="btn btn-warning">Save Changes</button>
            <button onClick={cancelEdit} className="btn btn-danger">Cancel</button>
          </div>
        )}
      </div>
    </>
  );
};

export default GetUsers;
