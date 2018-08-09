var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

enroll = (enrollment) =>
    enrollmentModel.create(enrollment);

unenroll = (uid, sid) =>
    enrollmentModel.deleteOne({
        section: sid,
        student: uid,
    });

findSectionsForStudent = (sid) => {
    return enrollmentModel
        .find({
            student: sid
        })
        .populate('section')
        .exec();
};

module.exports = {
    enroll,
    unenroll,
    findSectionsForStudent,
};