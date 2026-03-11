const Booking=require('../models/booking.model');
const {STATUS}=require('../utils/constants');

const createBooking=async(data)=>{
    try{
        const response=await Booking.create(data);
        return response;
    }catch(err){
        console.log(err);
        if(err.name=='ValidationError'){
            let error={};
            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            });

            throw {err:error,code:STATUS.UNPROCESSABLE_ENTITY}
        }
        throw err;
    }
}

const updateBooking=async(data,bookingId)=>{
    try{
        const response=await Booking.findByIdAndUpdate(bookingId,data,{
            new:true,runValidators:true
        });

        if(!response){
            throw{
                err:"No booking found for this ginven id",
                code:STATUS.NOT_FOUND
            }
        }

        return response;
    }catch(err){
        console.log(err);
        if(err.name=='ValidationError'){
            let error={};
            Object.keys(err.errors).forEach((key)=>{
                error[key]=err.errors[key].message;
            });

            throw {err:error,code:STATUS.UNPROCESSABLE_ENTITY};
        }
        throw err;
    }
}

module.exports={
    createBooking,
    updateBooking
}