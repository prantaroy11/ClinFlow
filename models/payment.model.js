const mongoose=require('mongoose');
const {PAMENT_STATUE}=require('../utils/constants');

const paymentSchema=new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Booking'
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:[PAMENT_STATUE.pending,PAMENT_STATUE.failed,PAMENT_STATUE.success],
            message:"Invalid payment"
        },
        default:PAMENT_STATUE.pending  
    }
},{timestamps:true});

const Payment=mongoose.model('Payment',paymentSchema);

module.exports=Payment;