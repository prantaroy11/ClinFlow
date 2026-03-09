const jwt=require('jsonwebtoken');
const {errorResponseBody}=require('../utils/responseBody');
const userService=require('../services/user.service');
const {USER_ROLE}=require('../utils/constants');

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

const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"];
        if(!token){
            errorResponseBody.message="Token is required for authentication";
            errorResponseBody.error="Authentication error";
            return res.status(403).json(errorResponseBody);
        }

        const response=jwt.verify(token,process.env.AUTH_KEY);
        if(!response){
            errorResponseBody.error="Token is invalid";
            return res.status(401).json(errorResponseBody);
        }

        const user=await userService.getUserById(response.id);
        req.user=user.id;
        next();
    }catch(err){
        if(err.name=="JsonWebTokenError"){
            errorResponseBody.error=err.message;
            return res.status(401).json(errorResponseBody);
        }
        if(err.code==404){
            errorResponseBody.error="User associated with the token not found";
            return res.status(err.code).json(errorResponseBody);
        }

        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}


const validateResetPasswordRequest=async(req,res,next)=>{
    if(!req.body.oldPassword){
        errorResponseBody.error="Missing the old password in the request";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.newPassword){
        errorResponseBody.error="Missing the new password in the request";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

const isAdmin=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    if(user.userRole!=USER_ROLE.admin){
        errorResponseBody.error="User is not an admin, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    next();
}

const isClient=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    if(user.userRole!=USER_ROLE.client){
        errorResponseBody.error="User is not a client, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    next();
}

const isAdminOrClient=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    if(user.userRole!=USER_ROLE.client && user.userRole!=USER_ROLE.admin){
        errorResponseBody.error="User is neither a client not an admin, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    next();
}



module.exports={
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
}
