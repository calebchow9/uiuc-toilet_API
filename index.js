var express = require('express')
var app = express()
var bathroomRoute = require('./routes/bathrooms')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// const MongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb+srv://admin:adminpassword@uiuc-toilet-kqm5l.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connectionString, { useNewUrlParser: true });

// app.listen(5000, () => {
//     MongoClient.connect(connectionString, { useNewUrlParser: true }, (error, client) => {
//         if(error) {
//             throw error;
//         }
//         database = client.db("main");
//         collection = database.collection("bathrooms");
//         console.log("Connected to `" + "main" + "`!");
//     });
// });

app.use(bodyParser.json())
app.use((req, res, next) =>{
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})


app.use(bathroomRoute)
app.use(express.static('public'))

// Error 404
app.use((req, res, next) =>{
    res.status(404).send('Error 404: Not Found')
})

//Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))