const { errorResponseBody } = require('../utils/responseBody');
const mongoose=require('mongoose');

/**
 * 
 * @param  req -> HTTP request object containing the details of the theatre to be created in the body
 * @param  res -> HTTP response object that will be used to send the response back to the client
 * @param  next -> callback function that will be called if the request is valid and we want to pass the control to the next middleware or controller function
 * @returns -> returns a response with status code 400 and an error message if any of the required fields are missing or invalid, otherwise it calls the next() function to pass the control to the next middleware or controller function
 */

const validateTheatreCreateRequest=(req,res,next)=>{
    const { name, city, pinCode, address } = req.body;

    if(!name){
        return res.status(400).json({
            success:false,
            message:"Name of the theatre is required"
        });
    }

    if(!city){
        return res.status(400).json({
            success:false,
            message:"City of the theatre is required"
        });
    }

    if(!pinCode){
        return res.status(400).json({
            success:false,
            message:"Pin code of the theatre is required"
        });
    }

    if(!address){
        return res.status(400).json({
            success:false,
            message:"Address of the theatre is required"
        });
    }

    next();
}

/**
 * 
 * @param  req -> HTTP request object containing the details of the movies to be added or removed in the body
 * @param res -> HTTP response object that will be used to send the response back to the client
 * @param next -> callback function that will be called if the request is valid and we want to pass the control to the next middleware or controller function
 * @returns -> returns a response with status code 400 and an error message if any of the required fields are missing or invalid, otherwise it calls the next() function to pass the control
 */

const validateUpdateMovies=async(req,res,next)=>{
    if(req.body.insert==undefined){
        errorResponseBody.err="Insert field is required to update the movies of the theatre";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.movieIds || !Array.isArray(req.body.movieIds) || req.body.movieIds.length===0){
        errorResponseBody.err="Details in invalid. Movie IDs field is required and should be a non-empty array";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

const validateTheatreId=async(req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        errorResponseBody.message="Invalid theatre id in the request params";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports={
    validateTheatreCreateRequest,
    validateUpdateMovies,
    validateTheatreId
}
