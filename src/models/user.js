const mongoose = require('../bin/connections')
const course = require("./course")

const schema = {
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Others']
    },
    batch: {
        type: String,
        ref: 'batch',
        required: false,
    },
    dob: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    course: {
        type: String,
        ref: 'course' ,
        required: false
    },
    role: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['Teacher', 'Student']
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    picture: {
        type: String,
        required: false,
        default: ''
    }
};
const collectionName = "user";
const userSchema = new mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);



const getAllUsers = (limit, offset, filters) => {
    const course = filters &&  filters.course  ? { course: {"$regex": filters.course, "$options": "i"}} : {}
    const role = filters && filters.role ? { role: filters.role} : {}
    const batch = filters && filters.batch ? { batch: filters.batch} : {}
    console.log(course)
    return new Promise((resolve, reject) => {
        User.find({...course,...batch, ...role})
            .then( (users) => {
                resolve(users || 'not');
            })
            .catch((error)=> {
                reject(error)
            })
    })

}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject)=> {
        User.findOne({email})
            .select('email name password role batch course')
            .then((response)=> {
                resolve(response)
            }).catch((error)=> {
            reject(error)
        })
    })


}

const createUser = (userData) => {
    return new Promise((resolve, reject)=> {
        User.create(userData, (error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

const findUserDetail = (userId) => {
    return new Promise((resolve, reject)=> {
        User.findById( userId, (error, response)=>  {
            if(error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
}

const updateUserDetail = (userId, userData) => {
    return new Promise((resolve, reject)=> {
        User.findByIdAndUpdate(userId, userData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(userData)
            }
        });
    })
}

const updatePassword=(userId, password)=>{
    return new Promise((resolve,reject)=>{
        User.findByIdAndUpdate(userId, password,(error,response)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(password)
            }
        })
    })
}

const deleteUser = (userId) => {
    return new Promise((resolve, reject)=> {
        User.findByIdAndRemove(userId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

module.exports = {deleteUser, findUserDetail,updatePassword, createUser, getAllUsers, getUserByEmail, updateUserDetail}
