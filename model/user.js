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
    unique : true
  },
  email: {
    type: String,
    default: "" ,
    unique : true
  },
  mobile: {
    type: String,
    default: "" ,
    unique : true 
  },
  password: {
    type: String,
    required: [true, "Password is not Alphanumeric"],
    min: 8,
    max: 25,

  },

});

const User = mongoose.model('User', userSchema);



//funtion for validation
// function validateUser(user) {


//   const JoiSchema = Joi.object({

//     username: Joi.string()
//       // .email()
//       .min(5)
//       .max(50)
//       .optional(),

//     // password: Joi.string().regex('/^[a-zA-Z][0-9]$/')
//     password: joiPassword.string()
//       .min(8)
//       .max(50)
//       .minOfLowercase(1)
//       .minOfUppercase(1)
//       .minOfSpecialCharacters(1)
//       .minOfNumeric(1)
//       .required()
      
    
//   }).options({ abortEarly: false });

//   return JoiSchema.validate(user)


// }


// module.exports.User = User;
module.exports = User ;