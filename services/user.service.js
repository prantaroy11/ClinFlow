const User=require('../models/user.model');
const {USER_ROLE,USER_STATUS}=require('../utils/constants');

const createUser=async(data)=>{
    try{
        if(!data.userRole || data.userRole==USER_ROLE.customer){
            if(data.userStatus && data.userStatus!=USER_STATUS.approved){
                throw{err:"We can not set other status for customer",code:422};
            }
        }

        if(data.userRole && data.userRole!=USER_ROLE.customer){
            data.userStatus=USER_STATUS.pending;
        }

        const response=await User.create(data);
        return response;
    }catch(error){
        if(error.name=="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            });
            throw {err:err,code:422};
        }
        throw error;
    }
}

const getUserByEmail=async(email)=>{
    try{
        const response=await User.findOne({
            email:email
        });

        if(!response){
            throw {err:"No user found with the given email",code:404};
        }
        return response;
    }catch(err){
        console.log(err);
        throw err;
    }
}

const getUserById=async(id)=>{
    try{
        const response=await User.findById(id);
        if(!response){
            throw {err:"No user found with the given id",code:404};
        }
        return response;
    }catch(err){
        console.log(err);
        throw err;
    }
}


 const updateUserRoleorStatus=async(data,userId)=>{
    try{
        let updateQuery={};
        if(data.userRole) updateQuery.userRole=data.userRole;
        if(data.userStatus) updateQuery.userStatus=data.userStatus;

        const response=await User.findOneAndUpdate(
            {_id:userId},
            updateQuery
        ,{new:true,runValidators:true});

        if(!response){
            throw {err:"No user found for this given id",
                code:404
            }
        };

        return response;
    }catch(err){
        if(err.name=="ValidationError"){
            let error={};
            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            })
           throw {err:error,
            code:400
           }
        }
        throw err;
    }
 }


module.exports={
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleorStatus
}