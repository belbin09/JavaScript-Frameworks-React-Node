import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [conversation, setConversation] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState([]);
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    Axios.get(`/api/messages/${props.match.params.convoId}/${props.match.params.messageId}`)
      .then(result => {
        setConversation(result.data);
        setMessage(result.data.messages.find(msg => msg._id = props.match.params.messageId));
      })
      .catch(err => console.error(err));
  }, [props]);


  function handleSubmit(event) {
    event.preventDefault();

    Axios.post(
      "/api/messages/update",
      {
        conversation: {
          id: conversation._id
        },
        message: {
          id: message._id,
          content: inputs.content
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
    return <Redirect to={`/conversations/${conversation._id}`} />;
  }

  if(message.content != null) {
    console.log("message", message);
    console.log("conversation", conversation);
  return (
    <div className="container">
      <header>
        <h1>Edit</h1>
      </header>
      <form onSubmit={handleSubmit}>
          <div className="form-group text">
            <input type="hidden" name="messageID" value="message._id"/>
    
            <input type="hidden" name="conversationID" value="conversation.id"/>
            <textarea id="message-box" className="form-control.message" name="content" defaultValue={message.content} onChange={handleInputChange}/>
            <button className="btn btn-dark" type="submit">Submit</button>
          </div>  
        </form>
    </div>
  );
  }
  else {
    return null;
  }
}

export default Edit;