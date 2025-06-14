const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,

    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true, // before inster check if same entry already exist or not

    },
    jobTitle:{
     type: String,
    },
    gender:{
        type: String,
    },
},
{timestamps:true}
);
const User = mongoose.model('user',userschema);
module.exports = User;
