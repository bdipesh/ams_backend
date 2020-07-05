const UserModel = require("../models/user");
const bcrypt = require('bcryptjs')


class UserDetails {
    userList (req, res) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        let filters = null;
        if (req.query) {
            filters = {
                batch: req.query.batch,
                course: req.query.course
            }
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        UserModel.getAllUsers(limit, page, filters || null)
            .then((result) => {
                res.status(200).json(result);
            })
    }
    createUsers (req, res) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const defaultImages =  {
            Male: '/male.jpeg',
            Female: '/female.jpeg',
            Others: '/others.jpeg'

        }
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            dob: req.body.dob,
            gender: req.body.gender,
            phone: req.body.phone,
            picture:  req.files && req.files.length ? req.files[0].filename : defaultImages[req.body.gender],
            batch: req.body.batch,
            course: req.body.course,
            role: req.body.role
        }
        UserModel.getUserByEmail(userData.email).then((response) => {
            if(response) {
                res.status(400).send({message: "User with email already exit."})
            } else {
                UserModel.createUser(userData)
                    .then((result) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        res.status(201).send({id: result._id});
                    })
                    .catch((error) => {
                        res.status(400).send({error})
                    })
            }
        })
    }
    updateUsers (req, res) {
        const userData = {
            name: req.body.name,
            //email: req.body.email,
            //password: req.body.password,
            dob: req.body.dob,
            phone: req.body.phone,
            //batch: req.body.batch,
            //course: req.body.course,
            //role: req.body.role
        }
        UserModel.updateUserDetail(req.params.id, userData)
            .then((result) => {
                res.status(201).send({id});
            });
    }

    findOneUser (req, res) {
        UserModel.findUserDetail(req.params.id)
            .then((result)=> {
                res.status(201).send(result)
            })
    }

    deleteUser (req, res) {
        UserModel.deleteUser(req.params.id)
            .then((result)=> {
                res.status(200).send(result)
            })
    }


}

module.exports = UserDetails;