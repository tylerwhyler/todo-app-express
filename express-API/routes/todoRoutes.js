const express = require("express")
const router = express.Router()

const Todos = require("../models/todoModel")
const { restart } = require("nodemon")

// Get
router.get("/todos", (req, res) => {
    Todos.find((err, document) => {
        if (err) {
            res.status(404).json({ message: "get todos error:", errors: `${err}` })
        } else {
            res.status(200).json(document)
        }
    })
})

// Show route (gets one item)

router.get("/todo/:id", (req, res) => {
    Todos.findById(req.params.id, (err, document) => {
        if (err) {
            res.status(404).json({ message: "error getting todo:", errors: `${err}` })
        } else {
            res.status(200).json(todo)
        }
    })
})

// Post
router.post("/todo", (req, res) => {
    const todo = new Todos(req.body)

    todo
        .save()
        .then(document => {
            res.status(200).json(document)
        })
        .catch(err => {
            res.status(400).json({ message: "unable to post", errors: `${err}`})
        })
})

// Patch


// Delete


module.exports = router