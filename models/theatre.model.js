const mongoose=require('mongoose');

const theatreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
    },
    description:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },     
},{timestamps:true});

const Theatre=mongoose.model('Theatre',theatreSchema);

module.exports=Theatre;