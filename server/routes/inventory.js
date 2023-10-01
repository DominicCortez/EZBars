const express = require('express')
const router = express.Router()
const { inventory } = require('../models')

router.get("/", async (req, res) =>{
    const listOfItems = await inventory.findAll();
    res.json(listOfItems);
});

router.post("/" , async (req, res) => {
    const inventoryreq = req.body;
    await inventory.create(inventoryreq)
    res.json(inventoryreq)
});

module.exports = router;