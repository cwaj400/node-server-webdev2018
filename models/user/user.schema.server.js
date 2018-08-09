const mongoose = require('mongoose');


module.exports = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SectionModel'}]
}, {collection: 'user'});
