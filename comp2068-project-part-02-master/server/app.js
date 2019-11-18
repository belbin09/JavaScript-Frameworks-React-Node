// Our dotenv
require("dotenv").config();

// Connecting to MongoDB cluster with Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    useNewUrlParser: true
  })
  .catch(err => console.error(`ERROR: ${err}`));

// Our imported libraries
const express = require("express");

// Assigning Express to an app contstant
const app = express();

// Adding cookie and session support to our application
const cookieParser = require("cookie-parser");
const session = require("express-session");
//const flash = require("connect-flash");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret || "boorakacha",
    cookie: {
      maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
  })
);
/*
app.use(flash());
app.use((req, res, next) => {
  debugger;
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;

  next();
});
*/

// Our authentication helper
const jwt = require("jsonwebtoken");
const isAuthenticated = req => {
  const token =
    //need to check if the cookies, body, query and headers objects actually exists before we access their properties
    (req.cookies && req.cookies.token) || //this actually return the req.cookies.token if the expression is true
    (req.body && req.body.token) ||
    (req.query && req.query.token) ||
    (req.headers && req.headers["x-access-token"]);

  if (req.session.userId) return true;
  if (!token) return false;

  jwt.verify(token, "bobsyouruncle", function(err, decoded) {
    if (err) return false;
    return true;
  });
};

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) return false;

    return true;
  };

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});
// End of our authentication helper

// This maintains our home path
const path = require("path");

// Body parser which will make reading request bodies MUCH easier
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.get("*", (req, res) => {
//   res.sendFile(path.join((__dirname + "/../client/build/index.html")));
// });

// Our routes
const routes = require("./routes.js");
app.use("/api", routes);

//Enable the Socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log("user connected");

  socket.on('join', function(room) {
    socket.join(room);
    console.log(`user joined room: ${room}`);
  });

  socket.on('message sent', function(room){
    console.log('Message sent event received');
    io.to(`${room}`).emit('new message');
    console.log("new message event emitted");
  });

  socket.on('disconnection', () => {
    console.log("user disconnected");
  })

});

// Starting our server on port 4000
//app.listen(process.env.PORT || 4000, () => console.log("Listening on 4000"));
http.listen(process.env.PORT || 4000, () => console.log("Listening on 4000"));
