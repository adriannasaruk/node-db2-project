const express = require('express')
const knex = require('knex')

const knexfile = require("../knexfile.js")
const db = knex(knexfile.development)

const router = express.Router()

router.get('/', (req,res) => {
    db('cars')
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        res.status(500).json({message: "Error"})
    })
})

router.get('/:VIN', (req,res) => {
    const {VIN} = req.params

    db('cars').where({VIN})
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        res.status(500).json({message: "Error"})
    })
})

router.post('/', (req,res)=> {
    const carData = req.body

    db('cars').insert(carData)
    .then(car=> {
        res.status(200).json({message: "New car was added"})
    })
    .catch(err => {
        res.status(500).json({message: "error"})
    })
})

router.put('/:VIN', (req,res) => {
    const changes = req.body
    const {VIN} = req.params

    db("cars").where({VIN})
    .update(changes)
    .then(count => {
        if(count>0) {
            res.status(200).json({message: "it was updated"})
        } else {
            res.status(404).json({error: "no car by that ID"})
        }
    })
})

router.delete("/:VIN", (req,res) => {
    const {VIN} = req.params
    db("cars").where({VIN})
    .del()
    .then( count => {
        if (count > 0) {
            res.status(200).json({mesasge: "car was deleted"})
        } else {
            res.status(404).json({message: "no car by that ID"})
        }
    })
})

module.exports = router