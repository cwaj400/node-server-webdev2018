const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server');

findAllSections = () =>
    sectionModel.find();


deleteUser = (id) =>
    userModel.remove({_id: id});


deleteSection = sectionId =>
    sectionModel.remove({_id: sectionId});

findAllSectionsForCourse = courseId =>
    sectionModel.find({courseId: courseId});

findSectionByItsId = sectionId =>
    sectionModel.findById(function (err, sectionId) {
        if (err) throw err;
        console.log(sectionId);
    });

createSection = section =>
    sectionModel.create(section);

enroll = (userId, sectionId) =>
    userModel.findUserById(userId)
        .then(user => {
            user.sections.push(sectionId);
            return user.save();
        });

updateSection = (sectionId, newSection) =>
    sectionModel.update({_id: sectionId},
        {$set: newSection});

module.exports = {
    enroll,
    findAllSections,
    findAllSectionsForCourse,
    createSection,
    findSectionByItsId,
    updateSection,
    deleteSection
};