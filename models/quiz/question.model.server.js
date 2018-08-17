const mongoose = require('mongoose');
const schema = require('./question.schema.server');
const questionModel = mongoose.model('QuestionModel', schema);

createQuestion = question =>
    questionModel.create(question);

findAllQuestions = () =>
    questionModel.find();

updateQuestion = (questionId, newQuestion) =>
    questionModel.update({
            _id: questionId
        },
        {
            $set: newQuestion
        });

findQuestionById = qId =>
    questionModel.findById(qId);

deleteQuestion = (questionId) =>
    questionModel.remove({
        _id: questionId
    });

module.exports = {
    createQuestion,
    findAllQuestions,
    findQuestionById,
    deleteQuestion,
    updateQuestion
};