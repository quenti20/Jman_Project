const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const app = express()
const dataRoutes = require("./routes/routes")
const bodyparser = require('body-parser')

app.use(bodyparser.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect("mongodb+srv://avikpat:1234@cluster0.kus5z.mongodb.net/assesementsTrainging")

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));  
db.once('open', function() {
    console.log("Connected to MongoDB database");   
});

app.use('/', dataRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)   
})

