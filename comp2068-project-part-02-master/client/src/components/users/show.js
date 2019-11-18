import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Show(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`/api/users/${props.match.params.id}`)
    .then(result => setUser(result.data))
    .catch(err => console.log(err));
  }, [props]);

  return (
    <div className="container">
      <header>
        <h1 className="user">Profile</h1>
      </header>
      <div className="user-container">
        <div className="user-profile">
          {user.firstName}
        </div>
        <div className="user-profile">
          {user.lastName}
        </div>
        <div className="user-profile break-word">
          {user.email}
        </div>
        <div profile-buttons>
          <Link to={`/users/${user._id}/edit`}>edit</Link>|
                <Link to={`/users/${user._id}/destroy`}>delete</Link>
        </div>
      </div>
    </div>
  )
}

export default Show;