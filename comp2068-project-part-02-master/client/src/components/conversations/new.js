import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

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

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/conversations", {
        email: inputs.email
    })
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  if (redirect) return <Redirect to="/conversations" />;

  return (
    <div className="container">
    <header>
      <h1>New Conversation</h1>
    </header>

    <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipient Email</label>
            <input
              className="form-control"
              name="email"
              required
              onChange={handleInputChange}
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

export default New;
