const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name : {
        type : String
    },
    age : {
        type : Number
    },
    email : {
        type : String
    }
},  { versionKey : false })

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;