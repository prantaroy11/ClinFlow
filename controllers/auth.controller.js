const userService=require('../services/user.service');
const { errorResponseBody, successResponseBody } = require('../utils/responseBody');

const signUp=async(req,res)=>{
    try{
        const response=await userService.createUser(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully registered the user";
        return res.status(201).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports={
    signUp,
}