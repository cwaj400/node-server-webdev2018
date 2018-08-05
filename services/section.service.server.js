module.exports = app => {
    const sectionModel = require('../models/sections/section.model.server');

    app.put('/api/section/:sectionId/enroll', (req, res) => {
        const currentUser = req.session['currentUser'];
        sectionModel
            .enroll(currentUser._id, req.params['sectionId'])
            .then(status => res.sendStatus(200))
    });


    updateSection = (req, res) => {
        const sid = req.session['currentSession']._id;
        var title = req.body.title;
        var courseId = req.body.courseId;
        var newSection = {
            title: title, courseId: courseId
        };
        sectionModel.updateSection(sid, newSection).then(status => res.sendStatus(200));
    };


    app.get('/api/section/:sectionId', (req, res) => {
        sectionModel.findSectionByItsId(req.params['sectionId']).then(status => res.sendStatus(200))
    });

    app.get('/api/section', (req, res) =>
        sectionModel
            .findAllSections()
            .then(sections => res.send(sections))
    );

    app.get('/api/course/:courseId/section', (req, res) =>
        sectionModel
            .findAllSectionsForCourse(req.params['courseId'])
            .then(sections => res.send(sections))
    );

    app.post('/api/course/:courseId/section', (req, res) =>
        sectionModel
            .createSection(req.body)
            .then(section => res.send(section))
    );

    deleteSection = (req, res) => {
        const sid = req.session['currentSection']._id;
        sectionModel.deleteSection(sid);
    };


    app.put('/api/section/:sectionId', updateSection);
    app.delete('/api/section/:sectionId', deleteSection);

};