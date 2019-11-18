import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    Axios.get(`/api/users/${props.match.params.id}`)
      .then(result => setInputs(result.data))
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post(
      "/api/users/update",
      {
        id: props.match.params.id,
        user: {
          firstName:  inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email
        }
      })
      .then(() => setRedirect(true))
      .catch(err => console.err(err));
  }

  function handleInputChange(event) {
    event.persist();
    const {name, value} = event.target;

    setInputs(inputs => {
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) {
    return <Redirect to="/users" />;
  }

  return (
    <div className="container">
      <header>
        <h1 className="user">Edit {inputs.firstName}'s Profile</h1>
      </header>
      <div>
        <form action="/users" method="POST" onSubmit={handleSubmit}>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              name="firstName"
              required="required"
              defaultValue={inputs.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lastName"
              required="required"
              defaultValue={inputs.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              required="required"
              defaultValue={inputs.email}
              onChange={handleInputChange}
            />
          </div>
          </form>
          <div className="form-group">
            <button className="btn btn-dark" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;