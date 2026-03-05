/**
 * This object will be used as a template building error response
 */

const errorResponseBody={
    success:false,
    error:{},
    data:{},
    message:"Something went wrong"
}

/**
 * This object will be used as a template building success response
 */
const successResponseBody={
    success:true,
    error:{},
    data:{},
    message:"Successfully process the request"
}


module.exports={
    errorResponseBody,
    successResponseBody,
}