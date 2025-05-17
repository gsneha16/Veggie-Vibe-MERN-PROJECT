const joi = require('joi')

const signupValidation = (req,res,next)=>{
    const schema = joi.object({
        username :joi.string().min(3).max(50).required(),
        email : joi.string().email().required(),
        password : joi.string().min(4).max(20).required(),
        contact : joi.string().max(10).min(10).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"Bad Request",error})
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        username : joi.string().required(),
        contact : joi.string().min(10).max(10).required(),
        password : joi.string().min(4).max(20).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message:"Bad Request",error})
    }
    next();
}

module.exports ={
    signupValidation,loginValidation
}