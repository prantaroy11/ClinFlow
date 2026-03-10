const {STATUS}=require('../utils/constants');

const badRequestBody={
    success:false,
    err:{},
    data:{},
    message:"Malformed Request or Bad Request"
}

/**
 * 
 * @param  req ->HTTP request object containing the details of the movie to be created in the body
 * @param  res -> HTTP response object that will be used to send the response back to the client
 * @param  next -> callback function that will be called if the request is valid and we want to pass the control to the next middleware or controller function
 * @returns -> returns a response with status code 400 and an error message if any of the required fields are missing or invalid, otherwise it calls the next() function to pass the control to the next middleware or controller function
 */

const validateMovieCreateRequest=async(req,res,next)=>{
    if(!req.body.name){
        badRequestBody.err="Name of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }

    if(!req.body.description){
        badRequestBody.err="Description of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }

    if(!req.body.casts || !Array.isArray(req.body.casts) || req.body.casts.length===0){
        badRequestBody.err="Casts of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }

    if(!req.body.trailerUrl){
        badRequestBody.err="Trailer URL of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }
    
    if(!req.body.releaseDate){
        badRequestBody.err="Release date of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }

    if(!req.body.director){
        badRequestBody.err="Director name of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }

    if(!req.body.releaseStatus){
        badRequestBody.err="Release status of the movie is required";
        return res.status(STATUS.BAD_REQUEST).json(badRequestBody);
    }

    next();

}

module.exports={
    validateMovieCreateRequest,
}