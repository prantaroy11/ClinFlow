const axios=require('axios');
const User=require('../models/user.model');
const { response } = require('express');

const sendMail= async(subject,id,content)=>{
    try{
        const user=await User.findById(id);
            await axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications',{
            subject:subject,
            recepientEmails:[user.email],
            content:content
        });

        console.log("Notification service response",response.data);
    }catch(err){
        console.error("Notification service error:", err.message);
    }
}

module.exports=sendMail;