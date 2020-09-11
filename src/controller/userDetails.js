const UserModel = require("../models/user");
const bcrypt = require('bcrypt')
const ExcelJs = require('exceljs');
const readXlsxFile = require("read-excel-file/node");


class UserDetails {
    userList (req, res) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        let filters = null;
        if (req.query) {
            filters = {
                batch: req.query.batch,
                course: req.query.course,
                role: req.query.role
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
            password: bcrypt.hashSync(req.body.password, 10),
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
    createManyUsers (req, res) {
        try {
            if (req.file === undefined) {
                return res.status(400).send({message: "Please upload an excel file!"});
            }
            console.log(req.body)
            let path =
               `./uploads/${req.file.filename}`;

            readXlsxFile(path).then((rows) => {
                // skip header
                rows.shift();

                let users = [];

                rows.forEach((row) => {
                    let user = {
                        name: row[1],
                        email: row[2],
                        gender: row[3],
                        dob: row[4],
                        phone: row[5],
                        role: req.body.role,
                        course: req.body.course,
                        batch: req.body.batch,
                        password: 'hellonepal'
                    };
                    users.push(user);
                });

                UserModel.CreateManyUser(users)
                    .then(() => {
                        res.status(200).send({
                            message: "Uploaded the file successfully: " + req.file.originalname,
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: "Fail to import data into database!",
                            error: error.message,
                        });
                    });
            });
        } catch (error) {
            console.log('Fuck You');
            res.status(500).send({
                message: "Could not upload the file: " + req.file.originalname,
            });
        }
    }
    async getSampleFile (req, res) {
        try {
            // const users = [{
            //     name: 'Suman Katwal',
            //     email: 'suman@gmail.com',
            //     gender: 'Male',
            //     phone: '983938393',
            //     dob: '2/3/2020',
            //     role: 'Teacher'
            // }]
            // const workbook = new ExcelJs.Workbook();
            // const worksheet = workbook.addWorksheet('My Users');
            // worksheet.columns = [
            //     {header: 'S.no', key: 's_no', width: 10},
            //     {header: 'Name', key: 'name', width: 10},
            //     {header: 'Email', key: 'email', width: 10},
            //     {header: 'Gender', key: 'gender', width: 10},
            //     {header: 'Phone', key: 'phone', width: 10},
            //     {header: 'dob', key: 'dob', width: 10},
            //     {header: 'role', key: 'role', width: 10},
            // ];
            // let count = 1;
            // users.forEach(user => {
            //     user.s_no = count;
            //     worksheet.addRow(user);
            //     count += 1;
            // });
            // worksheet.getRow(1).eachCell((cell) => {
            //     cell.font = {bold: true};
            // });
            const file = `${__dirname}/users.xlsx`
            res.download(file)
            res.send('done');
        } catch (e) {
            res.status(500).send(e);
        }
    }
    updateUsers (req, res) {
        const userData = {
            name: req.body.name,
            //email: req.body.email,
            //password: req.body.password,
            dob: req.body.dob,
            phone: req.body.phone,
            batch: req.body.batch,
            course: req.body.course,
            //role: req.body.role
        }
        UserModel.updateUserDetail({_id: Object(req.params.id)}, {$set: userData} )
            .then((result) => {
                res.status(201).send({result});
            });
    }
    updatepassword(req,res){
        let email = req.body.email
        let password = req.body.oldPassword
        console.log(req.body)
        UserModel.getUserByEmail(email)
            .then((response) => {
                bcrypt.compare(password, response.password, function (err, success)   {
                    if(!success) {
                        res.status(400).send({message: "Old Password does not match.", error: err})
                    }

                    if(success) {
                        const dataToPost={
                            password: bcrypt.hashSync(req.body.newPassword, 10)
                        }

                        UserModel.updatePassword({_id: Object(req.params.id)},{$set:dataToPost})
                            .then((result)=>{
                                res.status(201).send({result});
                            })
                        res.status(200).send({
                            success: true,
                            status: "Successfully Change Password"
                        })
                    }

                } )
            })
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