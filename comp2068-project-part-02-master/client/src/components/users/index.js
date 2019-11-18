import React, { useState, useEffect } from "react";
import Axios from "axios";

function Index() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/api/users")
      .then(result => setUsers(result.data)) 
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1 className="user">
          Contacts
        </h1>
      </header>
      <div className="backdiv">
        <table className="table table-striped">
          <thead>
            <tr>
              <td className="heading">User</td>
              <td className="heading">Email</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>(
            <tr key={user._id}>
              <td className="user-info">{user.firstName} {user.lastName}</td>
              <td className="user-info">{user.email}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
  
  export default Index; 