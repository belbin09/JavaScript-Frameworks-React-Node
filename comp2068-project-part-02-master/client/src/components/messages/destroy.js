import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Destroy(props) {
  useEffect(() => {
    Axios.post('/api/messages/destroy', { 
      conversation: {id: props.match.params.convoId},
      message : {id: props.match.params.messageId}
    });
  }, []);

  return <Redirect to={`/conversations/${props.match.params.convoId}`} />;
}

export default Destroy;