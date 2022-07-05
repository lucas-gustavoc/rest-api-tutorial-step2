const express = require('express')
const router = new express.Router() // Here we create the router we will be exporting later
const Wish = require('../model/Wish') // Here we import the Wish class from the model/Wish.js file

/*
    In this file, we will be creating the routes that will be 
    accessed by the API consumers to make changes or request
    to our API register.
*/

// When you see "our_server_address", consider it to be your server.
// For testing purposes, it'll be localhost:3000. But it can change
// on production environments.

// This is a post request to the address http://our_server_address/wishes
// It expects JSON data and return the created register.
router.post('/wishes', (req, res) => {
    try {
        const nWish = Wish.create(req.body)
        if (nWish) {
            res.status(201).send(nWish)
        } else {
            res.status(400).send({ message: 'Invalid entry!' })
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

router.get('/wishes', (req, res) => {
    try {
        res.status(200).send(Wish.getAll())
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

router.get('/wishes/:id', (req, res) => {
    try {
        const foundWish = Wish.getOne(req.params.id)
        if (foundWish) {
            res.status(200).send(foundWish)
        } else {
            res.status(404).send({ message: 'Wish not found!'})
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

router.patch('/wishes/:id', (req, res) => {
    try {
        const updatedWish = Wish.patch(req.params.id, req.body)
        if (updatedWish) {
            res.status(200).send(updatedWish)
        } else {
            res.status(404).send({ message: 'Wish not found!' })
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

router.delete('/wishes/:id', (req, res) => {
    try {
        const deleteMessage = Wish.delete(req.params.id)
        if (deleteMessage) {
            res.status(200).send(deleteMessage)
        } else {
            res.status(404).send({ message: 'Wish not found!' })
        }
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

module.exports = router