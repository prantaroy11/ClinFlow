const { errorResponseBody } = require('../utils/responseBody');

/**
 * 
 * @param  req -> HTTP request object containing the details of the theatre to be created in the body
 * @param  res -> HTTP response object that will be used to send the response back to the client
 * @param  next -> callback function that will be called if the request is valid and we want to pass the control to the next middleware or controller function
 * @returns -> returns a response with status code 400 and an error message if any of the required fields are missing or invalid, otherwise it calls the next() function to pass the control to the next middleware or controller function
 */

const validateTheatreCreateRequest=(req,res,next)=>{
    if(!req.body.name){
        errorResponseBody.err="Name of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.city){
        errorResponseBody.err="City of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.pinCode){
        errorResponseBody.err="Pin code of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.address){
        errorResponseBody.err="Address of the theatre is required";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports={
    validateTheatreCreateRequest
}