const userService=require('../services/user.service');
const {errorResponseBody,successResponseBody}=require('../utils/responseBody');

const update=async(req,res)=>{
    try{
        const response=await userService.updateUserRoleorStatus(req.body,req.params.id);

        successResponseBody.data=response;
        successResponseBody.message="Successfully update the user";
        return res.status(200).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err.err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports={
    update,
};