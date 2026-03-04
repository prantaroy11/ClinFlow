const errorResponseBody={
    success:false,
    error:{},
    data:{},
    message:"Something went wrong"
}

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