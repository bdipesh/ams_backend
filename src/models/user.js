import mongoose from '../bin/connections'
import course from "./course";

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
    const conditions = filters && (filters.batch || filters.course ) ? {batch: filters.batch || '', course: {$in: filters.course}} : {}
    const role = filters && filters.role ? { role: filters.role} : {}
    console.log(conditions)
    return new Promise((resolve, reject) => {
        User.find({...conditions, ...role})
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
                resolve(response)
            }
        });
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

export default {deleteUser, findUserDetail, createUser, getAllUsers, getUserByEmail, updateUserDetail}
