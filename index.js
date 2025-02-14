const express=require('express')
const app=express();
const mongoose=require('mongoose');
const PORT=8000;
app.use(express.urlencoded({extended:false}))

//connection
mongoose.connect('mongodb://127.0.0.1:27017/martian1').then(()=>{
    console.log("MongoDB connected")
})
.catch(e=>{
    console.log("error:",e);
})
//Define Schema
const userSchema=new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },

    last_name:{
        type: String,
        required: false
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    job_title:{
        type: String,
    },
    gender:{
        type: String
    }
},{timestamps:true})

//Make Model
const User=mongoose.model("user",userSchema) //model name-user

//routes
app.route("/api/users").post(async (req,res)=>{
    const body=req.body;
    const user = await User.create({
        first_name: body.first_name, // ✅ Match schema field names
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });

    return res.status(201).json({msg:"User created successfully",
        user_created:user
    })
 
})
.get(async (req,res)=>{
    const allusers=User.find({});
})

 








app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})







