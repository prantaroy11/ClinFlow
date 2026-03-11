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

const getBookings=async(data)=>{
    try{
        const response=await Booking.find(data);
        if(response.length==0){
            throw{
                err:"No user find with the crosponding user id",
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

const getAllBookings=async()=>{
    try{
        const response=await Booking.find();
        if(response.length==0){
            throw{
                err:"There are currently no bookings",
                code:STATUS.OK
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

const getBookingById=async(id,userId)=>{
    try{
        const response=await Booking.findById(id);
        if(!response){
            throw{
                err:"No booking records found for the id",
                code:STATUS.NOT_FOUND
            }
        }

        if(response.userId != userId){
            throw{
                err:"Not able to acess the booking",
                code:STATUS.UNAUTHORISED
            }
        }
       return response;
    }catch(err){
        console.log(err);
        throw err;
    }
}



module.exports={
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings,
    getBookingById
}