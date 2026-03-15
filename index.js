const express=require('express');
const env=require('dotenv');
env.config();
const mongoose=require('mongoose');

const MovieRoutes=require('./routes/movie.routes');
const TheatreRoutes=require('./routes/theatre.routes');
const AuthRoutes=require('./routes/auth.routes');
const UserRoutes=require('./routes/user.routes');
const BookingRoutes=require('./routes/booking.routes');
const ShowRoutes=require('./routes/show.routes');
const PaymentRoutes=require('./routes/payment.routes');



const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.set('debug',true);

MovieRoutes(app);
TheatreRoutes(app);
AuthRoutes(app);
UserRoutes(app);
BookingRoutes(app);
ShowRoutes(app);
PaymentRoutes(app);

app.get('/',(req,res)=>{
    res.send('Home');
});

app.listen(process.env.PORT,async()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    try{
        if(process.env.NODE_ENV=='production'){
            await mongoose.connect(process.env.PROD_DB_URL);
        }else{
            await mongoose.connect(process.env.DB_URL);
        }
        console.log("successfully connect mongo");
    }catch(err){
        console.log("Not able to connect mongo",err)
    }
})