const mongoose = require('mongoose');
const submissionSchema = require('./submission.schema.server');
const submissionModel = mongoose.model('SubmissionModel', submissionSchema);

const submitQuiz = submission =>
    submissionModel.create(submission);

const findAllSubmissions = () =>
    submissionModel.find();

const findAllSubmissionsForStudent = studentId =>
    submissionModel.find({
        student: studentId
    });

const findSubmissionById = (quizId, submissionId) =>
    submissionModel.findById(submissionId)
        .populate({
            path: 'quiz',
            populate: {
                path: 'questions'
            }
        })
        .populate('student')
        .exec();

const findAllSubmissionsForQuiz = quizId =>
    submissionModel.find({
        quiz: quizId
    })
        .populate({
            path: 'quiz',
            populate: {
                path: 'questions'
            }
        })
        .populate('student')
        .exec();

module.exports = {
    submitQuiz,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById,
};