require('dotenv').config({ path: 'config/config.env' });
const app = require("./app");
const cloudinary = require("cloudinary");
const connectDataBase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    server.close(() => {
        process.exit(1);
    })
})


const PORT = process.env.PORT;

//Connecting to database
connectDataBase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})


//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
})
