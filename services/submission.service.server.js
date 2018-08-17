module.exports = app => {
    const submissionModel = require('../models/submission/submission.model.server');

    app.post('/api/quiz/:quizId/submission', (req, res) => {
        submissionModel.submitQuiz(req.body)
            .then(submission => res.send(submission));
    });
    app.get('/api/submission', (req, res) => {
        submissionModel.findAllSubmissions()
            .then(submissions => res.send(submissions));
    });
    app.get('/api/quiz/:quizId/submission', (req, res) => {
        submissionModel.findAllSubmissionsForQuiz(req.params['quizId'])
            .then(submissions => res.send(submissions));
    });
    app.get('/api/quiz/:quizId/submission/:submissionId', (req, res) => {
        submissionModel.findSubmissionById(req.params['quizId'], req.params['submissionId'])
            .then(submission => res.send(submission));
    });
};