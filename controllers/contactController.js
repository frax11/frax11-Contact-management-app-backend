const asyncHandler = require("express-async-handler");//Iniziazing async handler Middleware 
const Contact = require("../models/contactModel");//Inizializing Contact Model


//@desc Get all contacts
//@route GET /api/contacts/
//@access Private
const getContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create New contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async(req,res) =>{
    console.log("REQUEST BODY: ",req.body);
    const{name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const contact = await Contact.create({
        user_id:req.user.id,
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //Check if the contact belongs to the user 
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized to access this contact");
    }
    
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updateContact);
});

//@desc DELETE contact
//@route REMOVE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    //Check if the contact belongs to the user 
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized to access this contact");
    }
    const deleteContact = await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(deleteContact);
});

module.exports = {getContact, getContacts, createContact, updateContact, deleteContact};
