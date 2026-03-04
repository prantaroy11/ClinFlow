
const badRequestBody={
    success:false,
    err:{},
    data:{},
    message:"Malformed Request or Bad Request"
}

const validateMovieCreateRequest=async(req,res,next)=>{
    if(!req.body.name){
        badRequestBody.err="Name of the movie is required";
        return res.status(400).json(badRequestBody);
    }

    if(!req.body.description){
        badRequestBody.err="Description of the movie is required";
        return res.status(400).json(badRequestBody);
    }

    if(!req.body.casts || !Array.isArray(req.body.casts) || req.body.casts.length===0){
        badRequestBody.err="Casts of the movie is required";
        return res.status(400).json(badRequestBody);
    }

    if(!req.body.trailerUrl){
        badRequestBody.err="Trailer URL of the movie is required";
        return res.status(400).json(badRequestBody);
    }
    
    if(!req.body.releaseDate){
        badRequestBody.err="Release date of the movie is required";
        return res.status(400).json(badRequestBody);
    }

    if(!req.body.director){
        badRequestBody.err="Director name of the movie is required";
        return res.status(400).json(badRequestBody);
    }

    if(!req.body.releaseStatus){
        badRequestBody.err="Release status of the movie is required";
        return res.status(400).json(badRequestBody);
    }

    next();

}

module.exports={
    validateMovieCreateRequest,
}