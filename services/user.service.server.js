module.exports = app => {
    const userModel = require('../models/user/user.model.server');

    findAllUsers = (req, res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    login = (req, res) => {
        console.log('in login');
        const user = req.body;
        userModel.findUserByCredentials(user.username, user.password)
            .then(response => {
                if (response === null) {
                    res.send(404);
                } else {
                    req.session['currentUser'] = response;
                    res.send(response);
                    res.send(status);
                    console.log(response);
                }
            });
    };

    profile = (req, res) => {
        res.send(req.session['currentUser']);
    };

    register = (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        console.log("hello from node");
        var newUser = {
            username: username, password: password
        };
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (!user) {
                    return userModel.createUser(newUser)
                }
            })
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            });
    };

    logout = (req, res) => {
        req.session.destroy();
        res.send(200);
        console.log("destroy session in node");
    };

    updateUser = (req, res) => {
        const uid = req.session['currentUser']._id;
        var username = req.body.username;
        var password = req.body.password;
        var newUser = {
            username: username, password: password
        };
        userModel.updateUser(uid, newUser);
    };

    deleteUser = (req, res) => {
        const uid = req.session['currentUser']._id;
        userModel.deleteUser(uid);
    };

    getAllUsers = (req, res) => {
        userModel.findAllUsers().then(users => res.send(users));
    };


    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.get('/api/profiles', profile);
    app.put('/api/profile', updateUser);

    app.delete('/api/profile', deleteUser);

    app.get('/api/user', getAllUsers);

};