module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    findAllUsers = (req, res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    login = (req, res) => {
        const user = req.body;
        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
                req.session['currentUser'] = user;
                res.send(req.session['currentUser']);
            });
    };

    profile = (req, res) => {
        const profile = req.session['currentUser'];
        if (profile) {
            userModel.findUserByIdExpanded(profile._id)
                .then(user => res.send(user))
        } else {
            res.sendStatus(403)
        }
    };

    register = (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var newUser = {
            username: username, password: password
        };
        userModel.createUser(newUser).then(() => res.send(newUser));
    };

    logout = (req, res) => {
        req.session.destroy();
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

    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateUser);

    app.delete('/api/profile', deleteUser);

};