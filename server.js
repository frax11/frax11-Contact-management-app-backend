const express =require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('./config/db'); // Ensure this path is correct

connectDb();
const app = express();
const port =process.env.PORT || 3001;

app.use(express.json()); //Body Parser Middleware 
app.use("/api/contacts/",require("./routes/contactRoutes")); //Inizializing Routes
app.use("/api/users/",require("./routes/userRoutes")); //Inizializing Routes 
app.use(errorHandler); //Iniziazing Error Handling Middleware   

app.listen(port,()=>{ 
    console.log("server running on Port:",port);
});
