const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

class HandleLogin {
    loginWithDetails(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        UserModel.getUserByEmail(email)
            .then((result) => {
                if (result) {
                    bcrypt.compare(password, result.password).then( (success) => {
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: result}, config.secret)
                        res.status(200).send({
                            success: true,
                            token: token,
                            status: "Logged in successful"
                        })
                    })
                        .catch((err) => {
                            if(err) {
                                console.log('here jj')
                                res.status(400).send({message: "Password does not match.", error: err})
                            }
                        })
                } else {
                    res.status(400).send({message: "Invalid Login details."})
                }
            })
    }
    getLoginUser (req, res) {
        let token =  req.headers['authorization'];
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err)
                res.status(401).send({message: "You do not have permission"});
            }
            UserModel.findUserDetail(decoded.data._id).then((result)=> {
                res.status(200).send(result)
            })

        });
    }
}

module.exports = HandleLogin;