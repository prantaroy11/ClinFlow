const {errorResponseBody}=require('../utils/responseBody');

const validateSignupRequest=(req,res,next)=>{

    if(!req.body.name){
        errorResponseBody.message="Name is required";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.email){
        errorResponseBody.message="Email is required";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.password){
        errorResponseBody.message="Password is required";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports={
    validateSignupRequest
}
