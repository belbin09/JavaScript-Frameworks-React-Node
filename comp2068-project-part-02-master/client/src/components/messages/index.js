import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import socketIOclient from "socket.io-client";

function Index(props) {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});
  const [users, setUsers] = useState({});
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  var socket = socketIOclient('http://localhost:4000'); //should default to our host, which will proxy to :4000 to the server?
  socket.on('connect', function() { //request to join this conversation's room
    socket.emit('join', `${props.match.params.convoId}`);
  });

  socket.on('new message', function() {
    console.log('new message event received');
      getMessages();
  });

  function getMessages() {
    Axios.get(`/api/conversations/${props.match.params.convoId}`)
    .then(result => {
      setConversation(result.data);
      if (result.data) setMessages((result.data.messages || []));
      if (result.data) setUsers(result.data.users);
      if (result.data) {
        setInputs(inputs => {
          return {
            ...inputs,
            messagesID: result.data.messages._id,
            conversationID: result.data._id
          };
        });
      }
      console.log("OUR FREAKING RESULT DATA", result.data);
    }) 
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    getMessages();
  }, []);

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

    socket.emit('message sent', props.match.params.convoId); //tell all user in the room that a message has been sent
    console.log('message sent event emitted');
    document.querySelector('#message-box').value = "";

    Axios.post("/api/messages/update", inputs)
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  if(messages != null) {
  var messagesToRender = messages.map(message => {
    return (
    <tr key={message._id}>
                  <td className="user-container">{message.content}</td>
                  <ul className="nav flex-column">
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">...</Link> 
                      <div className="dropdown-menu">
                          <Link to={`/messages/${conversation._id}/${message._id}/edit`}>edit</Link> | <Link to={`/messages/${conversation._id}/${message._id}/destroy`}>delete</Link>
                      </div>
                    </li>
                  </ul>
                </tr>
    );
  });

  var usersToRender = messages.map(message => {
    return (
    <tr className="message-row" key={`${message.user._id}-${message._id}`}>
      <td className="user-name">{message.user.firstName} {message.user.lastName}</td>
    </tr> 
    );
  });

  var tableToRender = [];
  for(var i = 0; i < messagesToRender.length; i++) {
    tableToRender.push(usersToRender[i]);
    tableToRender.push(messagesToRender[i]);
  }
  }
  else {
    var tableToRender = [];
  }

  // {message.user.firstName}{message.user.lastName}
  console.log("our data", conversation, users, messages);
  if(conversation.length !== 0){
    return (
      <div className="container">
        <header>
          <h1 className="user"> ChitChat </h1>
        </header>
        <div className="box left">
          <table className="table table-striped convo">
            <tbody>
              {tableToRender}
              {/*
              {messages.map(message => (
                <tr className="message-row" key={message.user._id}>
                  <td className="user-name">{message.user.firstName} {message.user.lastName}</td>
                </tr>  
              ))} 
              {messages.map(message => (
                <tr key={message._id}>
                  <td className="user-container">{message.content}</td>
                  <ul className="nav flex-column">
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">...</Link> 
                      <div className="dropdown-menu">
                          <Link to={`/messages/${conversation._id}/${message._id}/edit}`}>edit</Link> | <Link to={`/messages/${conversation._id}/destroy`}>delete</Link>
                      </div>
                    </li>
                  </ul>
                </tr>
              ))}*/}
            </tbody>
          </table>
        </div>
        <div className="box right bg-dark">
            <table className="table table-striped user">
              <thead>
                <tr>
                  <th className="chatter">Chatter Participants</th>
                </tr>
              </thead>
                <tbody>
                  {users.length && users.map(user => (
                    <tr className="message-row" key={user._id}>
                      <td className="user-name side">{user.firstName} {user.lastName}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
        <form onSubmit={handleSubmit}>
           {/* {if message} */}
          <div className="form-group text">
            <textarea id="message-box" className="form-control.message" name="messageContent" onChange={handleInputChange} />
            <button className="btn btn-dark" type="submit">Submit</button>
          </div>  
        </form>
      </div>
    );
  }
  
  return null;
}

export default Index; 