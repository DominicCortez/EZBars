const express = require('express')
const router = express.Router()
const { products } = require('../models')

router.get("/", async (req, res) =>{
    try{
        const listOfItems = await products.findAll();
        res.json(listOfItems);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/" , async (req, res) => {
    try{
        const productreq = req.body;
        await products.create(productreq)
        res.json(productreq)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        await products.destroy({
            where:{
                id: id,
            },
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.put("/itemsupplier" , async (req, res) => {
    try{
        const {newItemSupplier , id} = req.body;
        await products.update({itemsupplier: newItemSupplier},{where:{id : id} })
        res.json(newItemSupplier);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});
router.put("/itemname" , async (req, res) => {
    try{
        const {newItemName , id} = req.body;
        await products.update({itemname: newItemName},{where:{id : id} })
        res.json(newItemName);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});
router.put("/itemdescription" , async (req, res) => {
    try{
        const {newItemDescription , id} = req.body;
        await products.update({itemdescription: newItemDescription},{where:{id : id} })
        res.json(newItemDescription);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }  
});
router.put("/itemprice" , async (req, res) => {
    try{
        const {newItemPrice , id} = req.body;
        await products.update({itemprice: newItemPrice},{where:{id : id} })
        res.json(newItemQuantity);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

module.exports = router