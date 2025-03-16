const express = require('express');
const router = express.Router();
const { registerUser,loginUser,userProfile,userDelete } = require('../controllers/userController'); // Import the user controller
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser); // Register a user
router.post('/login',loginUser ); // Login a user
//get user profile
router.get('/profile', validateToken, userProfile);
//delete user profile
router.delete('/profile', validateToken, userDelete);


module.exports = router;    // Export the router