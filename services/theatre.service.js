const Theatre=require('../models/theatre.model');

const createTheatre=async(data)=>{
    try{
        const theatre=await Theatre.create(data);
        return theatre;
    }catch(err){
        if(err.name==="ValidationError"){
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

module.exports={
    createTheatre

}