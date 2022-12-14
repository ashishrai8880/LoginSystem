const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);


//funtion for validation
function validateUser(user) {


    const JoiSchema = Joi.object({

      username: Joi.string()
        // .email()
        .min(8)
        .max(25)
        .optional(),
  
      email: Joi.string()
        .email()
        .min(8)
        .max(25)
        .optional(),
        

      mobile: Joi.string()
        
        .min(10)
        .max(10)
        .optional(),
  
      // password: Joi.string().regex('/^[a-zA-Z][0-9]$/')
      password: joiPassword.string()
        .min(8)
        .max(50)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfSpecialCharacters(1)
        .minOfNumeric(1)
        .required() ,

      token : Joi.string()
        .optional(),
        
      
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
  
  
  }

  module.exports.validate = validateUser;