const userService=require('../services/user.service');
const {errorResponseBody,successResponseBody}=require('../utils/responseBody');
const {STATUS}=require('../utils/constants');

const update=async(req,res)=>{
    try{
        const response=await userService.updateUserRoleorStatus(req.body,req.params.id);

        successResponseBody.data=response;
        successResponseBody.message="Successfully update the user";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(err){
        if(err.err){
            errorResponseBody.error=err.err;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.error=err.err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports={
    update,
};