const Payment=require('../models/payment.model');
const Booking=require('../models/booking.model');
const Show=require('../models/show.models');
const {STATUS,BOOKING_STATUS,PAYMENT_STATUS, USER_ROLE}=require('../utils/constants');
const User = require('../models/user.model');



const createPayment = async(data)=>{
   try{

      const booking = await Booking.findById(data.bookingId);

      if(!booking){
         throw{
            err:"No booking found",
            code:STATUS.NOT_FOUND
         }
      }

      if(booking.status == BOOKING_STATUS.successfull){
         throw{
            err:"Booking already paid",
            code:STATUS.FORBIDDEN
         }
      }

      if(data.amount != booking.totalCost){
         throw{
            err:"Incorrect payment amount",
            code:STATUS.BAD_REQUEST
         }
      }

      const payment = await Payment.create({
         bookingId:data.bookingId,
         amount:data.amount
      });

      payment.status = PAYMENT_STATUS.success;
      booking.status = BOOKING_STATUS.successfull;

      await payment.save();
      await booking.save();

      return booking;

   }catch(err){
      throw err;
   }
}

const getPaymentById=async(id)=>{
    try{
        const response=await Payment.findById(id).populate('bookingId');
        if(!response){
            throw{
                err:'No payment record found',
                code:STATUS.NOT_FOUND
            }
        }
        return response;
    }catch(err){
        throw err;
    }
}

const getAllPayments = async (userId) => {
    try {

        const user = await User.findById(userId);

        let filter={};
        if(user.userRole != USER_ROLE.admin){
            filter.userId=user._id;
        }
        const bookings=await Booking.find(filter,'_id');
        const bookingIds = bookings.map(b => b._id);
        const payments=await Payment.find({bookingId:{$in:bookingIds}});
        return payments
    } catch (err) {
        throw err;
    }
};

module.exports={
    createPayment,
    getPaymentById,
    getAllPayments
}