const express = require("express")
const router = express.Router()

const Todos = require("../models/todoModel")
const { restart } = require("nodemon")

// Get
router.get("/todos", (req, res) => {
    Todos.find((err, doc) => {
        if (err) {
            res.status(404).json({ message: "get todos error:", errors: `${err}` })
        } else {
            res.status(200).json(doc)
        }
    })
})

// Show route (gets one item)

router.get("/todo/:id", (req, res) => {
    Todos.findById(req.params.id, (err, doc) => {
        if (err) {
            res.status(404).json({ message: "error getting todo:", errors: `${err}` })
        } else {
            res.status(200).json(doc)
        }
    })
})

// Post
router.post("/todo", (req, res) => {
    const todo = new Todos(req.body)

    todo
        .save()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(400).json({ message: "unable to post", errors: `${err}`})
        })
})

// Patch
router.patch("/todo/:id", (req, res) => {
    const { done } = req.body

    Todos.findById(req.params.id, (err, doc) => {
        if (err) {
            res.status(404).json({ message: "Todo not found. Could not update", errors: `${err}` })
        } else {
            doc.done = done

            doc
                .save()
                .then(doc => {
                    res.status(200).json({ message: `Todo Item: "${doc.title}" updated`})
                })
                .catch(err => {
                    res.status(400).json({ message: "unable to update", err: `${err}`})
                })
        }
    })
})


// Delete
router.delete("/todo/:id", (req, res) => {
    Todos.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            res.status(404).json({ message: "Could not delete, todo not found", errors: `${err}`})
        } else {
            res.status(200).json({ message: "removed, goodbye"})
        }
    })
})


module.exports = router