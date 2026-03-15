const axios=require('axios');
const User=require('../models/user.model');

// const sendMail= async(subject,id,content)=>{
//     try{
//         const user=await User.findById(id);
//             await axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications',{
//             subject:subject,
//             recepientEmails:[user.email],
//             content:content
//         });

//         console.log("Notification service response",user.data);
//     }catch(err){
//         console.error("Notification service error:", err.message);
//     }
// }

const sendMail = async (subject, id, content) => {
  try {
    const user = await User.findById(id);

    const response = await axios.post(
      `${process.env.NOTI_SERVICE}/notiservice/api/v1/notifications`,
      {
        subject,
        recepientEmails: [user.email],
        content
      },
      { timeout: 10000 }
    );

    console.log("Notification sent:", response.data);

  } catch (err) {

    if (err.response && err.response.status === 429) {
      console.log("Notification service rate limited. Retrying in 5 seconds...");

      setTimeout(() => {
        sendMail(subject, id, content);
      }, 5000);

    } else {
      console.error("Notification service error:", err.message);
    }
  }
};

module.exports=sendMail;