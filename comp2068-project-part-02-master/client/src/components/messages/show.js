import React, {useState, useEffect} from "react";
import Axios from "axios";

function Show(props) {
  const [message, setMessage] = useState({});
  const [conversation] = useState({});

  useEffect(() => {
    Axios.get(`/api/messages/${props.match.params.id}`)
    .then(result => setMessage(result.data))
    .catch(err => console.error(err));
  }, [props]);

  return (
    <div className="container">
      <header>
        <h1>Message Details</h1>
      </header>
      <div>
        <h2>Conversation ID</h2>
        <text>{conversation._id}</text>
      </div>
      <div>
        <h2>Message ID</h2>
        <text>{message._id}</text>
      </div>
      <div>
        <h2>Message Sender ID</h2>
        <text>{message.user}</text>
      </div>
      <div>
        <h2>Message Content</h2>
        <text>{message.content}</text>
      </div>
    </div>
  )
}

export default Show;