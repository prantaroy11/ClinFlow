const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    userRole:{
        type:String,
        required:true,
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        default:"APPROVED"
    }
},{timestamps:true});

userSchema.pre('save',async function(){
    try{
        if(!this.isModified('password')){
            return ;
        }
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        console.log(this.password);
    }catch(err){
       throw err;
    }
})

const User=mongoose.model('User',userSchema);

module.exports=User;