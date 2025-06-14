const express = require("express");
const {handleGetAllUsers, handleGetUserById,handleUpdateUserById,handleDeleteUserById, handleCreateNewUser} = require('../controllers/users') // ../means outside the folders

const router = express.Router();

 router.route("/")
 .get(handleGetAllUsers)
 .post( handleCreateNewUse);


router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);
module.exports = router;