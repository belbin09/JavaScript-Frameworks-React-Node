import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/users", {
      user: {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        password: inputs.password,
        passwordConfirmation: inputs.passwordConfirmation
      }
    })
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => {
      return {
        ...inputs,
        [name]: value
      };
    });
  }

  if (redirect) return <Redirect to="/login" />;

  return (
    <div className="container">
      <header>
        <h1>New User</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              name="firstName"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lastName"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              name="email"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password Confirmation</label>
            <input
              className="form-control"
              name="passwordConfirmation"
              required="required"
              onChange={handleInputChange}
              type="password"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
