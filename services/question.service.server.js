module.exports = app => {
    const questionModel = require('../models/quiz/question.model.server');


    app.delete('/api/question/:questionId', (req, res) => {
        questionModel.deleteQuestion(req.params['questionId'])
            .then(status => res.send(status))

    });

    app.get('/api/question', (req, res) => {
        questionModel.findAllQuestions()
            .then(questions => res.send(questions))
    });

    app.put('/api/question/:questionId', (req, res) => {
        questionModel.updateQuestion(req.params['questionId'], req.body)
            .then(question => res.send(question))
    });

    findQuestionById = (req, res) =>
        questionModel.findQuestionById(req.params['questionId'])
            .then(question => res.send(question));


    createQuestion = (req, res) =>
        questionModel.createQuestion(req.body)
            .then(question => res.send(question));



    app.get('/api/question/:questionId', findQuestionById);
    app.post('/api/question', createQuestion);
};