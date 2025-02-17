const express=require('express')
const router =express.Router();
const {getAllUsers,createUser,getUserById,updateUserById,deleteUserById}=require('../controllers/user')

router.route("/")
    .post(createUser)
    .get(getAllUsers);


router
.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports=router;