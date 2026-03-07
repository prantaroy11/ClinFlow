const User=require('../models/user.model');

const createUser=async(data)=>{
    try{
        const response=await User.create(data);
        if(!response){
            return{
                err:"Error creating the user",
                code:500
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}
module.exports={
    createUser,
}