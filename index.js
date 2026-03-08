const express=require('express');
const env=require('dotenv');
env.config();
const mongoose=require('mongoose');

const MovieRoutes=require('./routes/movie.routes');
const TheatreRoutes=require('./routes/theatre.routes');
const AuthRoutes=require('./routes/auth.routes');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.set('debug',true);

MovieRoutes(app);
TheatreRoutes(app);
AuthRoutes(app);


app.listen(3000,async()=>{
    console.log("Server is running on port 3000");

   await mongoose.connect(process.env.DB_URL);
   console.log("successfully connect mongo");
})