const express=require('express')
const app=express();

const userRouter=require('./routes/user')
const {connectDB}=require('./connection');

const PORT=8000;
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//connection
connectDB('mongodb://127.0.0.1:27017/martian1');


//Define Schema
// in models Folder 

//Make Model
// in models Folder 

//routes 

app.use("/user",userRouter);




 
 







app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})







