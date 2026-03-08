const {errorResponseBody}=require('../utils/responseBody');

/**
 * 
 * @param  req ->HTTP request object
 * @param  res -> HTTP response object
 * @param  next ->next middleware
 * @returns 
 */
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

/**
 * 
 * @param  req ->HTTP request object
 * @param  res -> HTTP response object
 * @param  next ->next middleware
 * @returns 
 */
const validateSigninRequest=(req,res,next)=>{
    if(!req.body.email){
        errorResponseBody.message="Email is required";
        errorResponseBody.error="Validation error";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.password){
        errorResponseBody.message="Password is required";
        errorResponseBody.error="Validation error";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports={
    validateSignupRequest,
    validateSigninRequest
}
