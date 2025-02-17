const User=require('../models/user')

async function getAllUsers(req,res){
    const allusers=await User.find({});
    const html=`
        <ul>
            ${allusers.map(user=>`<li>${user.first_name} - ${user.email}</li>`).join("")}
        </ul>
    `
    res.send(html);
    // res.status(200).json({usersss:allusers})
}
async function createUser(req,res){
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
}

async function getUserById(req,res){
    const userId=await User.findById( req.params.id)
    if(!userId){
        res.status(404).send("user not found");
    }
    res.status(200).json({user: `${userId.id} - ${userId.first_name} ${userId.last_name} - ${userId.email} `})
}

async function updateUserById(req,res){
    const userId=req.params.id;
    const newData = req.body;  
    console.log(newData,req.body)
    const updateUser=await User.findByIdAndUpdate(userId,{ $set: newData}, // The fields to update
        { new: true, runValidators: false} )
        if(!updateUser){
            res.status(404).send("user not found!!")
        }
        res.status(200).json({msg: updateUser.first_name}); 
}

async function deleteUserById(req,res){
    const user=await User.findByIdAndDelete(req.params.id)
    res.send("User Deleted")
}

module.exports={
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
}
