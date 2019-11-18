//Delivers a list of the conversations to the user
const Conversation = require('../models/conversation');
const User = require('../models/user');

exports.create = (req, res) => {
    console.log("CREATE CONVO REQUEST RECEIVED");
    if (!req.isAuthenticated()) 
      return res.status(401).send({error: "Not Authenticated"});
    //Find the recipient in the database
    User.findOne({email: req.body.email})
        .then(recipient => {
            return recipient._id; 
        })
        .then((recipientId => {
            //Create a new conversation whose owners are the current session user and recipient
            Conversation.create(new Conversation({
                users: [req.session.userId, recipientId],
                message: [] //empty conversation
            }))
                .then(()=> res.status(200).send({ success: "Conversation created successfully" }))
                .catch(err => res.status(404).send(err));
    }))
        .catch(err => res.status(404).send({error: "Could not find the recipient" }));
}

exports.index = (req, res) => {
    if (!req.isAuthenticated()) 
    	return res.status(401).send({error: "Not Authenticated"});

    Conversation.find({
        //conversations in which the current user is a participant
        users: {$elemMatch: {$in: [req.session.userId]}}
    })
        .populate('users')
		.then(conversations => {
            console.log(conversations)
            res.json(conversations || [])
        })
        .catch(err => res.status(404).json(err));
}

//shows the contents of the conversation - all the messages. Actually uses the messages/index view
exports.show = (req, res) => {
    if (!req.isAuthenticated()) 
    	return res.status(401).send({error: "Not Authenticated"});
    //receives a conversation id. We need to display the correct message
    Conversation.findById(req.params.id)
        .populate('messages.user')
        .populate('users')
		.then(conversation => res.json(conversation))
					// {
          //   req.flash('success', "Found the conversation");
          //   res.render('messages/index', {
          //       title: "Talk about it",
          //       conversation: conversation,
          //       sessionUserId: req.session.userId
					// 	}
						// );
        // })
        .catch(err => res.status(404).json(err));
}

exports.destroy = (req, res) => {
    if (!req.isAuthenticated()) 
    	return res.status(401).send({error: "Not Authenticated"});
    Conversation.deleteOne({
        _id: req.body.id
    })
        .then(() => res.status(200).send({ success: "Conversation deleted" }))
        .catch(err => res.status(404).send(err));
}

