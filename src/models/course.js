import mongoose from '../bin/connections'

const schemaCourse = {
    courseCode: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    courseName: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
};
const collectionName = "course";
const courseSchema = new mongoose.Schema(schemaCourse);
const Course = mongoose.model(collectionName, courseSchema);


const getAllCourse = (limit) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .limit(limit)
            .exec(function (err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course);
                }
            })
    })

}


const createCourse = (courseData) => {
    return new Promise((resolve, reject)=> {
        Course.create(courseData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

const updateCourseDetail = (courseId, courseData) => {
    return new Promise((resolve, reject)=> {
        Course.findByIdAndUpdate(courseId, courseData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

const deleteCourse = (courseId) => {
    return new Promise((resolve, reject)=> {
        Course.findByIdAndRemove(courseId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

export default {
    deleteCourse,
    getAllCourse,
    createCourse,
    updateCourseDetail
}

