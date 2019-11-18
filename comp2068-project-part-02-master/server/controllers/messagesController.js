var Conversation = require('../models/conversation');

exports.show = (req, res) => {
    Conversation.findOne({_id: req.params.convoId})
        .then(conversation => { res.json(conversation);
            console.log(conversation)
        }) 
        .catch(err => res.status(404).json(err));
}

exports.create = (req, res) => {
    req.body.message.user = req.session.userId;
    console.log("conversation ID: " + req.body.conversation.id);
    console.log("new message content: " + req.body.message.content);
    console.log("new message user: " + req.body.message.user);

    Conversation.findById(req.body.conversation.id)
        .then(conversation => {
            console.log("Conversation object from db: " + conversation);
            console.log("conversation messages from db: " + conversation.messages);
            conversation.messages.push(req.body.message);
            conversation.save();
            res.status(200).send({ success: "New message created" })
         })
        .catch(err => res.status(404).send({ error: "Error writing message to the database" }));
}

//Render the page
exports.edit = (req, res) => {
    console.log("received conversation id: " + req.params.convoId);
    console.log("received message id: " + req.params.messageId);

    Conversation.findOne({_id: req.params.convoId})
        .then(conversation => res.send(conversation))
            // console.log("CONVERSATION FOUND");
            // console.log('requested message: ' + conversation.messages.id(req.params.messageId));
        //     req.flash('success', "Message found");
        //     res.render(`messages/edit`, {
        //         title: "Edit Message",
        //         message: conversation.messages.id(req.params.messageId),
        //         conversation: conversation
        // });
    // })
        .catch(err => res.status(404).send({ error: "Error could not find the messaged" }));
}

//Edit the text of a message
exports.update = (req, res) => {
    console.log("request body", req.body);
    Conversation.updateOne(
    { _id: req.body.conversationID },
    {
        $push: {
            messages: {
                content: req.body.messageContent,
                user: req.session.userId
            }
        }
    })
        .then(() => res.status(200).send({ success: "Message updated"}))
        .catch(err => {
            console.log("ERROR", err);
            res.status(404).send(err);
        });
}

exports.update = (req, res) => {
    Conversation.findOneAndUpdate(
    { "_id": req.body.conversation.id, "messages._id": req.body.message.id },
    { 
        "$set": {
            "messages.$.content": req.body.message.content 
        }
    })
        .then(() => res.status(200).send({ success: "Message updated"}))
        .catch(err => {
            console.log("ERROR", err);
            res.status(404).send(err);
        });
}

exports.destroy = (req, res) => {
    Conversation.findById(req.body.conversation.id)
        .then(conversation => {
            conversation.messages.id(req.body.message.id).remove();
            conversation.save();
            res.status(200).send({ success: "Message deleted" })
            })
        .catch(err => res.status(404).send(err));
}