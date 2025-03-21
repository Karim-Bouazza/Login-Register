const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

// SECRET
const username = process.env.USERNAME,
      password = process.env.PASSWORD,
      DB = process.env.DB,
      _PORT = 3001;

// CONNECT TO DB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uhn6v.mongodb.net/${DB}`)
.then (() => { console.log("Connection Succeed")})
.catch ((err) => { console.log("Connection Failed: ", err)})

// PARTIE 01 

// IMPORT USERS FROM DB
const userModel = require("./models/Users");
app.get("/users", async(req, res) => {
   const user = await userModel.find();
   res.json(user);
});

// INSERT USERS INTO DB
app.post("/creatUser", (req, res) => {
   const user = req.body;
   const newUser = new userModel(user);
   newUser.save();
})

// PARTIE 02

// REGISTER
const adminModel = require("./models/admins");
app.post("/Register", async(req, res) => {
   const {username, password} = req.body;
   
   const admin = await adminModel.findOne({username});

   if(admin) {
      return res.json({message : "admin is exist, please Login"});
   }

   const hashedPassword = bcrypt.hashSync(password, 10);

   const newAdmin = new adminModel({username : username, password : hashedPassword});
   await newAdmin.save();

   res.json({message : "admin is created"});

})

// LOGIN
app.post("/Login", async(req, res) => {
   const {username, password} = req.body;

   const admin = await adminModel.findOne({username});

   if(!admin) {
      return res.json({message : "Admin is not exist, please Register first"});
   }

   const passwordValidation = await bcrypt.compare(password, admin.password);

   if(!passwordValidation) {
      return res.json({message : "Username or Password is wrong"});
   } 

   const token = jwt.sign({id : admin._id}, process.env.SECRET);
   res.json({token, adminID : admin._id});
})

// CONNECT TO SERVER
app.listen(_PORT, (req, res) => {
    console.log("Server Works!");
})