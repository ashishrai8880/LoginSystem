const mongoose = require('mongoose')
const Joi = require("joi");
// const PasswordComplexity = require("joi-password-complexity");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);


const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type : String ,
    required : [true, "Username is required"] ,
    min: 8,
    max: 25,
    unique: true 
  },
  email: {
    type: String,
    default: "" ,
    // unique : true
  },
  mobile: {
    type: String,
    default: "" ,
    // unique : true 
  },
  password: {
    type: String,
    required: [true, "Password is not Alphanumeric"],
    min: 8,
    max: 25,

  },

});

const User = mongoose.model('User', userSchema);


// module.exports.User = User;
module.exports = User ;