const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const {USER_ROLE,USER_STATUS}=require('../utils/constants');

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
        enum:{
            values:[USER_ROLE.customer,USER_ROLE.admin,USER_ROLE.client],
            message:"Invalid user role given"
        },
        default:USER_ROLE.customer
    },
    userStatus:{
        type:String,
        required:true,
        enum:{
            values:[USER_STATUS.approved,USER_STATUS.pending,USER_STATUS.rejected],
            message:"Invalid status for user"
        },
        default:USER_STATUS.approved
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
});

/**
 * This is an instance method which will be used to compare the password given by user and the hashed password stored in database
 * @param  plainPassword-->Input password given by user 
 * @returns ->boolean value indicating whether the password is correct or not
 */

userSchema.methods.isValidPassword=async function(plainPassword){
    const currentUser=this;
    const compare=await bcrypt.compare(plainPassword,currentUser.password);
    return compare;
}

const User=mongoose.model('User',userSchema);

module.exports=User;