const asyncHandler = require("express-async-handler");//Iniziazing async handler Middleware 
const User = require("../models/userModel");//Inizializing User Model
const bcrypt = require("bcrypt");//Inizializing bcryptjs
const jwt = require("jsonwebtoken");//Inizializing jsonwebtoken

//@desc Register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req,res) =>{
    const{username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAviable = await User.findOne({email});
    if(userAviable){
        res.status(400);
        throw new Error("User already registered");
    }
    
    //Hashing the password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword, "--hashed password");
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    console.log(user, "--user Created");
    if(user){
        res.status(200).json({
            _id:user._id,
            email:user.email,
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login a user
//@route POST 
//@access Public
const loginUser = asyncHandler(async (req,res) =>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    //Checking if the user is registered & Comparing the password
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign(
            {
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({accessToken});

    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc Get user profile
//@route POST /api/users/userProfile
//@access Private
const userProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user.id);
    //Checking if the user is registered
        if(!user){
            res.status(404);
            throw new Error("Contact not found");
        }
    res.json(req.user); 
}); 

//@desc Delete user profile
//@route DELETE /api/users/userProfile
//@access Private
const userDelete = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user.id);
    //Checking if the user is registered
    if(!user){
        res.status(404);
        throw new Error("Contact not found");
    }
    const userDelete =await User.deleteOne({_id:req.user.id});
    res.status(200).json(userDelete);
});


module.exports={ registerUser,loginUser,userProfile,userDelete }; 

