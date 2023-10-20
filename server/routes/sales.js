const express = require('express')
const router = express.Router()
const { sales } = require('../models')

router.get("/", async (req, res) =>{
    const listOfItems = await sales.findAll();
    res.json(listOfItems);
});

router.post("/" , async (req, res) => {
    const salesreq = req.body;
    await sales.create(salesreq)
    res.json(salesreq)
});

router.get("/price", async (req, res) => {
    try {
        const allItemsDetails = await sales.findAll({
            attributes: ['id', 'itemquantity', 'itemprice'],
        });

        res.json(allItemsDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put("/itemcategory" , async (req, res) => {
    const {newItemCategory , id} = req.body;
    await sales.update({itemcategory: newItemCategory},{where:{id : id} })
    res.json(newItemCategory);
});
router.put("/itemname" , async (req, res) => {
    const {newItemName , id} = req.body;
    await sales.update({itemname: newItemName},{where:{id : id} })
    res.json(newItemName);
});
router.put("/itemdescription" , async (req, res) => {
    const {newItemDescription , id} = req.body;
    await sales.update({itemdescription: newItemDescription},{where:{id : id} })
    res.json(newItemDescription);
});
router.put("/itemnumber" , async (req, res) => {
    const {newItemNumber , id} = req.body;
    await sales.update({itemnumber: newItemNumber},{where:{id : id} })
    res.json(newItemNumber);
});
router.put("/itemquantity" , async (req, res) => {
    const {newItemQuantity , id} = req.body;
    await sales.update({itemquantity: newItemQuantity},{where:{id : id} })
    res.json(newItemQuantity);
});
router.put("/itemprice" , async (req, res) => {
    const {newItemPrice , id} = req.body;
    await inventory.update({itemprice: newItemPrice},{where:{id : id} })
    res.json(newItemQuantity);
});





router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await sales.destroy({
        where:{
            id: id,
        },
    })
})

module.exports = router;