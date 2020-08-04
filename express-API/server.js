const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3500

const todoRoutes = require("./routes/todoRoutes")

// Connect to db

mongoose.connect("mongodb://localhost:27017/express-todo", { 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    useNewUrlParser: true
}, err => {
    if (err) {
        console.log(`DB connection erro: ${err}`)
    } else {
        console.log("DB connected")
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", todoRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})