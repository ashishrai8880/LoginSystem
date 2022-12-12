const bcrypt = require('bcryptjs');
var validator = require('validator');
const User = require('../model/user');

const {validate} = require('../validator/passwordValidate');
var jwt = require('jsonwebtoken');

const register = async (req , res)=>{


    try {

        // This is checking alphanumeric password
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ success:false , message : error.details[0].message});

        let username = "" ;

        if(req.body.email){
            username = req.body.email ;
        }else{
            username = req.body.mobile ;
        }

        const user = await User.findOne({username : username}) ;

        // if user already exist 
        if(user){
            return res.status(400).json({success:false , message : "User already exists "}) ;
        }

        //encrypting password 
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(req.body.password, salt);      

        const newUser = new User({username : username ,email :req.body.email , mobile: req.body.mobile ,  password : hashPassword}) ;
        
        const saved = await newUser.save();
        
        res.status(200).json({success : true , message : saved});
        // res.status(200).json(newUser);
        
    } catch (error) {
        res.status(400).json({success:false , message : "Some internal error has occured . Your Data cannot saved "+ error});
    }

}



const login = async (req , res)=>{

    try {

        //Finding User 
        const user = await User.findOne({username : req.body.username}) ;

        //If User does not exist 
        if (!user) {
            return res.status(400).send({success:false , message : "Please Login with correct credentials"});
        }
        
        const passwordCompare = await bcrypt.compare(req.body.password , user.password);

        //If password is not matched 
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