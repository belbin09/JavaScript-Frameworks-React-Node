const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const conversationRoutes = require('./routes/conversations');
const sessionRoutes = require('./routes/sessions');

app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);
app.use('/', sessionRoutes);

module.exports = app;