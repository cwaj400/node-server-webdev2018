const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
    userModel.find();

findUserByCredentials = (username, password) =>
    userModel.findOne({username: username, password: password});

findUserByUsername = (username) =>
    userModel.findOne({username: username});

findUserById = userId =>
    userModel.findById(userId);

findUserByIdExpanded = userId =>
    userModel
        .findById(userId)
        .populate('sections')
        .exec();

createUser = (user) =>
    userModel(user).save();

deleteUser = (id) =>
    userModel.remove({_id: id});


updateUser = (userId, newUser) =>
    userModel.update({_id: userId},
        {$set: newUser});


module.exports = {
    findUserByIdExpanded,
    findUserById,
    findAllUsers,
    findUserByCredentials,
    createUser,
    deleteUser,
    updateUser,
    findUserByUsername
};