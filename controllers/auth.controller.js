const userService=require('../services/user.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');

const signUp=async(req,res)=>{
    try{
        const response=await userService.createUser(req.body);
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.code=response.code;
            errorResponseBody.message="Validation error";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully registered the user";
        return res.status(201).json(successResponseBody);
    }catch(err){
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports={
    signUp,
}