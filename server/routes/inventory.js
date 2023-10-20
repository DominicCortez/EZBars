const express = require('express')
const router = express.Router()
const { inventory } = require('../models')
const { Op } = require('sequelize');

router.get("/lowQuantityItems", async (req, res) => {
    try {
        const lowQuantityItems = await inventory.findAll({
            attributes: ['itemname'],
            where: {
                itemquantity: {
                    [Op.lte]: 15, // Op.lte means less than or equal to
                },
            },
        });

        res.json(lowQuantityItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/", async (req, res) =>{
    const listOfItems = await inventory.findAll();
    res.json(listOfItems);
});

router.post("/" , async (req, res) => {
    const inventoryreq = req.body;
    await inventory.create(inventoryreq)
    res.json(inventoryreq)
});

router.get("/price", async (req, res) => {
    try {
        const allItemsDetails = await inventory.findAll({
            attributes: ['id', 'itemquantity', 'itemprice'],
        });

        res.json(allItemsDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/latestItems", async (req, res) => {
    try {
        const latestItems = await inventory.findAll({
            attributes: ['updatedAt', 'itemname', 'itemquantity'],
            order: [['updatedAt', 'DESC']],
            limit: 10,
        });

        res.json(latestItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/itemcategory" , async (req, res) => {
    const {newItemCategory , id} = req.body;
    await inventory.update({itemcategory: newItemCategory},{where:{id : id} })
    res.json(newItemCategory);
});
router.put("/itemname" , async (req, res) => {
    const {newItemName , id} = req.body;
    await inventory.update({itemname: newItemName},{where:{id : id} })
    res.json(newItemName);
});
router.put("/itemdescription" , async (req, res) => {
    const {newItemDescription , id} = req.body;
    await inventory.update({itemdescription: newItemDescription},{where:{id : id} })
    res.json(newItemDescription);
});
router.put("/itemnumber" , async (req, res) => {
    const {newItemNumber , id} = req.body;
    await inventory.update({itemnumber: newItemNumber},{where:{id : id} })
    res.json(newItemNumber);
});
router.put("/itemquantity" , async (req, res) => {
    const {newItemQuantity , id} = req.body;
    await inventory.update({itemquantity: newItemQuantity},{where:{id : id} })
    res.json(newItemQuantity);
});
router.put("/itemprice" , async (req, res) => {
    const {newItemPrice , id} = req.body;
    await inventory.update({itemprice: newItemPrice},{where:{id : id} })
    res.json(newItemQuantity);
});





router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await inventory.destroy({
        where:{
            id: id,
        },
    })
})

module.exports = router;