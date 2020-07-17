const jwt =require( "jsonwebtoken");
const config =require( "../config");
const {Request} =require( "express");

const getLoggedInUser = (req) => {
    let token =  req.headers['authorization'];
    if (token.startsWith('Bearer')) {
        token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(err)
            return err
        }
        return  { fullName: decoded.name || '', profilePicture: decoded.picture || ''}
    });
}


module.exports= { getLoggedInUser }