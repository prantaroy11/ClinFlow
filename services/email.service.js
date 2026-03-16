const axios=require('axios');
const User=require('../models/user.model');

const sendMail= async(subject,id,content)=>{
    try{
        const user=await User.findById(id);
            await axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications',{
            subject:subject,
            recepientEmails:[user.email],
            content:content
        });
    }catch(err){
        console.log("Failed to send notification request:", error.message);
    }
}

module.exports=sendMail;