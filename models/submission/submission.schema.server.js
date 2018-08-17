const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
        fillBlanksAnswers: String,
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        essayAnswer: String,
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        }
    }],
    timestamp: Date,
}, {
    collection: 'submission'
});