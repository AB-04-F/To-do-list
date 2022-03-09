const express = require('express');

const app = express();
require('dotenv').config();

const mongo = require("mongodb");

let mongoClient = mongo.MongoClient;

let mongoUrl = "mongodb://localhost:27017";
let db;



const port = process.env.PORT || 3000;



const TodoTask = require("./models/TodoTask")



app.use('/static', express.static("public"))

app.use(express.urlencoded({ extended: true }))



//connection to db

mongoClient.connect(mongoUrl, (err, connection) => {
    if (err) console.log("Error while connecting");
    db = connection.db("test");
})



app.listen(port, (req, res) => {
    console.log(`server is running on ${port}`)
})









app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("todo.ejs")
});


app.post('/', (req, res) => {
    let todoTask = new TodoTask({
        content: req.body.content
    })
    try {
        todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
    console.log(req.body);
});