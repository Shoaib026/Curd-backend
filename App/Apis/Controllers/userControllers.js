var UsersModel = require('../Models/UserModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

module.exports = {

    register: function (req, res) {
        UsersModel.create(req.body)
            .then(iteams => {
                res.send("You have Signup now:")
            })
            .catch(err => {
                res.send(" Something went wrong!" + err)
            })
    }
    ,
    // authenticate means login
    authenticate: async function (req, res, next) {
        try {
            const userInfo = await UsersModel.findOne({ email: req.body.email });
            // UsersModel cames form Schema.
            // findOne is a queries in database
            // { email: req.body.email } 
            if (!userInfo) {
                return res.status(401).json({ status: "error", message: "Authentication failed. User not found." });
                // It sends a 401 status code "User not found".
            }

            const isMatch = await bcrypt.compare(req.body.password, userInfo.password);
            // by writing this thing "req.body.password, userInfo.password" we can compare "provided password" & "hashed password"

            if (isMatch) {
                const token = jwt.sign({ id: userInfo._id }, req.app.get('secretkey'), { expiresIn: '1h' });


                //id: userInfo._id: This includes the user's unique identifier (ID) from the database (userInfo._id). 
                //This allows the server to recognize which user is associated with the token.

                // The jwt.sign function creates a new JWT token.
               
                // You retrieve this secret key using req.app.get('secretkey').
                //You set a secret key in your Express application using app.set('secretkey', "your_secret_key").


                //The "expiresIn" token to expire in 1 hour.

                return res.json({ status: "success", message: "User found!", token: token });
                // It sends a  "success" status code "User found".

            } else {
                return res.status(401).json({ status: "error", message: "Authentication failed. Wrong password." });
                // It sends a 401 status code "User not found".
            }
        } catch (err) {
            return next(err);
        }
    }

}




