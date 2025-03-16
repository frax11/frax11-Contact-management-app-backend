// This file is used to handle the errors in the application. It will check the status code of the response and will send the response accordingly.

const { json } = require('express');
const {constants}=require('../constants')
const errorHandler =(err,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode:500; //If status code is not set, set it to 500
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed",
                message:err.message,
                stackTrace : err.stack
            });
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace : err.stack
            });
            break;
        case constants.UNATHORIZED:
            res.json({
                title:"Unauthorized",
                message:err.message,
                stackTrace : err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"Forbidden",
                message:err.message,
                stackTrace : err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title:"Server Error",
                message:err.message,
                stackTrace : err.stack
            });
            break;
        default:
            console.log("no error found");
            break;
    }
}

module.exports = errorHandler;
