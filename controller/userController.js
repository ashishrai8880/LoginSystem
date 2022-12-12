const User = require('../model/user');

const {validate} = require('../validator/passwordValidate');
var jwt = require('jsonwebtoken');
const privateKey = "Ashishisagoodboy" ;

const register = async (req , res)=>{


    try {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        // console.log(error);        

        const newUser = new User({email : req.body.email , password : req.body.password}) ;
        
        const saved = await newUser.save();
        
        res.status(200).json(saved);
        // res.status(200).json(newUser);
        
    } catch (error) {
        res.status(400).send("Some internal error has occured . Your Data cannot saved ");
    }

}



const login = async (req , res)=>{

    try {


        const user = await User.findOne({email : req.body.email}) ;

        if (!user) {
            return res.status(400).send({success:false , message : "Please Login with correct credentials"});
        }
        
        // const passwordCompare = await bcrypt.compare(req.body.password , user.password);
        if(user.password != req.body.password){
            return res.status(400).send({success:false , message :  "Please Login with correct credentials"});
        }

        var token = jwt.sign(user.id , privateKey);
        // console.log(token);

        res.status(200).json({success : true , token : token , user}) ;
            
        
    } catch (error) {
        res.status(400).send({success:false , error :"Some error has been occurred"});
    }

}

module.exports = {
    register ,
    login
    
}