//delivers a dataset of users

var User = require("../models/user");

//create a new user
exports.create = (req, res) => { 
    User.create(req.body.user)
        .then(() => 
            res.status(200).send({ success: "User successfully created" })
        )
        .catch(err => res.status(404).send(err))     
};

//Request details on a single user
exports.show = (req, res) => {
    User.findOne({
            _id: req.session.userId,
        })
        .then((user) => res.json(user))
        // {
        //     res.render('users/show', {
        //         title: "Profile",
        //         user: user //pass in the current user object to be displayed
        //     });
        // })
        .catch((err) => err => res.status(404).json(err));
}

//Request list of all the registered users
exports.index = (req, res) => {
    User.find({
   
            //Filter db request by the session userId
            //_id: req.session.userId            
        })        
        .then((users) => res.json(users))
        // res.render('users/index',{
        //     title: "Users",
        //     users: users
        // }))
        .catch((err) => err => res.status(404).json(err));
}

//Open page to edit a single user's profile
exports.edit = (req, res) => {
    User.findOne({
            _id: req.params.id,
        })
        .then(user => res.send(user))
        .catch(err => res.status(404).send(err));
}

//Update a users profile
exports.update = (req, res) => {
    User.updateOne({
            _id: req.body.id,
        }, req.body.user, {runValidators: "true"})
        .then(() => res.status(200).send({ success: "User updated sucessfully" }))
        .catch(err => res.status(404).send(err)); //may need to provide it with the id to edit
}

//delete a user
exports.destroy = (req, res) => {
    User.deleteOne({
            _id: req.body.id,
        })
        .then(() => res.status(200).send({ success: "User sucessfully deleted" }))
        .catch(err => err => res.status(404).send(err));
}