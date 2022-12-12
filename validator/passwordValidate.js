const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);


//funtion for validation
function validateUser(user) {


    const JoiSchema = Joi.object({
  
      email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .optional(),
  
      // password: Joi.string().regex('/^[a-zA-Z][0-9]$/')
      password: joiPassword.string()
        .min(8)
        .max(50)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfSpecialCharacters(1)
        .minOfNumeric(1)
        .required()
        
      
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
  
  
  }

  module.exports.validate = validateUser;