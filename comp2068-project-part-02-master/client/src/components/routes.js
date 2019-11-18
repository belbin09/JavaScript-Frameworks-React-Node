import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";

import ConversationIndex from "./conversations/index";
import ConversationNew from "./conversations/new";
import ConversationDestroy from "./conversations/destroy";
import UserIndex from "./users/index";
import UserShow from "./users/show";
import UserEdit from "./users/edit";
import MessageIndex from "./messages/index";
import MessageShow from "./messages/show";
import MessageEdit from "./messages/edit";
import MessageDestroy from "./messages/destroy";

import Register from "./sessions/register";
import Login from "./sessions/login";
import Logout from "./sessions/logout";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/conversations" component={ConversationIndex} />
      <Route exact path="/conversations/new" component={ConversationNew} />
      <Route exact path="/conversations/:id/destroy" component={ConversationDestroy} />
      <Route exact path="/conversations/:convoId" component={MessageIndex} />
      <Route exact path="/messages/:convoId/:messageId" component={MessageShow} />
      <Route exact path="/messages/:convoId/:messageId/edit" component={MessageEdit} />
      <Route exact path="/messages/:convoId/:messageId/destroy" component={MessageDestroy} />
      <Route exact path="/users" component={UserIndex} />
      <Route exact path="/users/:id" component={UserShow} />
      <Route exact path="/users/:id/edit" component={UserEdit} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} /> 
    </Switch>
  );
}

export default Routes;
