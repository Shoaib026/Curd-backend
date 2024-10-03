const mongoose = require('mongoose');
mongoose.pluralize(null);

const bcrypt = require('bcrypt');
const saltround = 10;


var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


 //  pre-save middleware: in Mongoose is used to hash the password to keep it secure before saving it to the database.
userSchema.pre('save', function (next) {
    
    this.password = bcrypt.hashSync(this.password, saltround);
    next();
});
 

    // this. : Refers to the current document being saved.
    // bcrypt: A library to help you hash passwords.
    // hashSync:  means secured this password in 10 diffrent types:
    // saltround : 10 is the form which secured it.


var UsersModel = mongoose.model('Users', userSchema);
module.exports = UsersModel;