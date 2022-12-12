const bcrypt = require('bcryptjs');
var validator = require('validator');
const User = require('../model/user');

const {validate} = require('../validator/passwordValidate');
var jwt = require('jsonwebtoken');

const register = async (req , res)=>{


    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // console.log(error);        
        var salt = bcrypt.genSaltSync(10);
        var email = ""
        var mobile = ""

        if( validator.isEmail(req.body.username)){
            email = req.body.username 
            mobile = ""
        }else{
            email = ""
            mobile = req.body.username
        }

        var hashPassword = bcrypt.hashSync(req.body.password, salt);      

        const newUser = new User({username : req.body.username ,email :email , mobile: mobile ,  password : hashPassword}) ;
        
        const saved = await newUser.save();
        
        res.status(200).json(saved);
        // res.status(200).json(newUser);
        
    } catch (error) {
        res.status(400).send("Some internal error has occured . Your Data cannot saved ");
    }

}



const login = async (req , res)=>{

    try {


        const user = await User.findOne({username : req.body.username}) ;

        if (!user) {
            return res.status(400).send({success:false , message : "Please Login with correct credentials"});
        }
        
        const passwordCompare = await bcrypt.compare(req.body.password , user.password);

        if(!passwordCompare){
            return res.status(400).send({success:false , message :  "Please Login with correct credentials"});
        }

        // console.log(passwordCompare);
        var token = jwt.sign( {id : user.id} , process.env.privateKey , { expiresIn : '10s' } );

        res.status(200).json({success : true , token : token , user}) ;
        
    } catch (error) {
        res.status(400).send({success:false , error :"Some error has been occurred"});
    }

}

module.exports = {
    register ,
    login
    
}