const  CourseModel = require("../models/course")


class CourseDetails {
    courseList (req, res) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        // let filters = req.filters
        // let page = 0;
        // if (req.query) {
        //     if(req.query.name){
        //         filters = req.query.filters
        //     }
        //     if (req.query.page) {
        //         req.query.page = parseInt(req.query.page);
        //         page = Number.isInteger(req.query.page) ? req.query.page : 0;
        //     }
        // }
        CourseModel.getAllCourse(limit)
            .then((result) => {
                res.status(200).json(
                    result
                );
            })
    }
    createNewCourse (req, res) {
        const courseData = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName
        }
        CourseModel.createCourse(courseData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }
    updateCourse (req, res) {
        const courseData = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName
        }
        CourseModel.updateCourseDetail(req.params.id, courseData)
            .then((result) => {
                res.status(201).send({id: result});
            });
    }


    deleteCourse (req, res) {
        CourseModel.deleteCourse(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

module.exports = CourseDetails;