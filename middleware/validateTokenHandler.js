const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let autHeader = req.headers.authorization || req.headers.Authorization; // Get the authorization header from the request
    if(autHeader && autHeader.startsWith("Bearer")){ // Check if the header exists and starts with Bearer
        token = autHeader.split(" ")[1]; // Get the token from the header 
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{ // Verify the token whit the secret key
            if(err){
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            req.user = decoded.user; // Set the user in the request object
            next(); // Call the next middleware function
        });
    }else{
        res.status(401);
        throw new Error("Not authorized or no token");
    }
});


module.exports = validateToken;