const express=require('express');
const bodyParser=require('body-parser');
const env=require('dotenv');
env.config();


const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})