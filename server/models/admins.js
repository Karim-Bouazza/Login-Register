const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    }
}, { versionKey : false })

const adminModel = mongoose.model("admins", adminSchema);
module.exports = adminModel;