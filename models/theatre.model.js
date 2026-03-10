const mongoose=require('mongoose');

const theatreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    description:{
        type:String,
        required:true
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
    movies:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Movie",
    }     
},{timestamps:true});

const Theatre=mongoose.model('Theatre',theatreSchema);

module.exports=Theatre;