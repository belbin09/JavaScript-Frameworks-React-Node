import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Index() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    Axios.get("/api/conversations")
      .then(result => setConversations(result.data)) 
      .catch(err => console.error(err));
  }, []);

  //console.log(conversations[0].users[0]);

  
  //for (let i = 0; i < conversations.length; i ++) {
  //  console.log(conversations[i].users[1].firstName);
  //}
  //debugger
  //console.log((conversations && conversations[0].users)); 
  //console.log(conversations[1].users);
  if(conversations.length !== 0){
    return (
    <div className="container">
      <header>
        <h1> ChitChat </h1>
      </header>
      <Button variant="dark" href={`/conversations/new/`}>New Conversation</Button>
      <div className="backdiv">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody> {conversations.map(conversation => (
            <tr key={conversation._id}>
              <td>
                {conversation.users.map((user, i) => {
                  if((i+1) === conversation.users.length) {
                    return `${user.firstName} ${user.lastName}`;
                  }
                  else {
                    return `${user.firstName} ${user.lastName}, `;
                  }
                }
                )}
              </td>
              <td>
              <Link to={`/conversations/${conversation._id}`}>open</Link> | <Link to={`/conversations/${conversation._id}/destroy`}>delete</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
    }
  return (
    <div className="container">
      <Button variant="dark" href={`/conversations/new/`}>New Conversation</Button>
    </div>
  )
}

export default Index; 