const asyncHandler = require("express-async-handler");
//Using the express aysnc handler to handle errors automatically. 
const User = require("../models/userModel");
//import User model
const generateToken = require("../config/generateToken");
//import jwt token function



const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {                     //checking if name, email, or password is undefined
        res.status(400);                                    // if undefined, throw error. 
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({ email });       //checking if user already exists in data base
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({          //otherwise, create new user. 
        name,
        email,
        password,
        pic,
    });

    if (user) {                 
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id), //create a new JWT token and send to user when user registers. 
        });
    } else {                    // checking for an error in creating a user. 
        res.status(400);
        throw new Error("Failed to Creat User");
    }
});


const authUser = asyncHandler(async(req,res) => {  //login functionality. 
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password)) ) {
            res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id), //create a new JWT token and send to user when user registers. 
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});
module.exports = { registerUser, authUser };