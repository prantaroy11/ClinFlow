const { errorResponseBody } = require("../utils/responseBody")

const validateUpdateRequest=async(req,res,next)=>{
    if(!(req.body.userRole || req.body.userStatus)){
        errorResponseBody.error="Malformed request, please send at least one parameter";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports={
    validateUpdateRequest,
}