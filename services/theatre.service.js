const Theatre=require('../models/theatre.model');

const createTheatre=async(data)=>{
    try{
        const theatre=await Theatre.create(data);
        return theatre;
    }catch(err){
        if(err.name=="ValidationError"){
            let error={};
            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            });
            return {err:error,code:422};
        }else{
            throw err;
        }
    }
}

const deleteTheatre=async(id)=>{
    try{
        const theatre=await Theatre.deleteOne({_id:id});
        return theatre;
    }catch(err){
        throw err;
    }
}

const getTheatre=async(id)=>{
    try{
        const theatre=await Theatre.findById(id);
        if(!theatre){
            return{
                err:"No theatre found with the corresponding id",
                code:404
            }
        }
        return theatre;
    }catch(err){
        throw err;
    }

}

module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre

}