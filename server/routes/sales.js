const express = require('express')
const router = express.Router()
const { sales } = require('../models')
const { Op } = require('sequelize');


router.get("/dailySales", async (req, res) => {
    try {
      const today = new Date();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
      // Calculate the start date as 10 days ago
      const startDate = new Date();
      startDate.setDate(today.getDate() - 10);
      const startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
  
      const dailySales = await sales.findAll({
        attributes: ['itemquantity', 'itemprice', 'updatedAt'],
        where: {
          updatedAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });
  
      const salesData = dailySales.map((sale) => {
        const dateKey = sale.updatedAt.toISOString().split('T')[0]; // Use the date as the key
        const salesForDay = sale.itemquantity * sale.itemprice;
  
        return { day: dateKey, sales: salesForDay };
      });
  
      res.json(salesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

router.get("/todaySales", async (req, res) => {
    try {
        const today = new Date();

        const todaySales = await sales.findAll({
            attributes: ['id', 'itemquantity', 'itemprice', 'updatedAt'],
            where: {
                updatedAt: {
                    [Op.between]: [new Date(today.setHours(0, 0, 0, 0)), new Date(today.setHours(23, 59, 59, 999))],
                },
            },
        });
        const salesWithTotal = todaySales.map((sale) => ({
            id: sale.id,
            itemname: sale.itemname,
            itemquantity: sale.itemquantity,
            itemprice: sale.itemprice,
            updatedAt: sale.updatedAt,
            total: sale.itemquantity * sale.itemprice,
        }));

        const totalOfAllItems = salesWithTotal.reduce((total, sale) => total + sale.total, 0);

        res.json({total: totalOfAllItems,});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/yesterdaySales", async (req, res) => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const yesterdaySales = await sales.findAll({
            attributes: ['id', 'itemquantity', 'itemprice', 'updatedAt'],
            where: {
                updatedAt: {
                    [Op.between]: [new Date(yesterday.setHours(0, 0, 0, 0)), new Date(yesterday.setHours(23, 59, 59, 999))],
                },
            },
        });
        const salesWithTotal = yesterdaySales.map((sale) => ({
            id: sale.id,
            itemname: sale.itemname,
            itemquantity: sale.itemquantity,
            itemprice: sale.itemprice,
            updatedAt: sale.updatedAt,
            total: sale.itemquantity * sale.itemprice,
        }));

        const totalOfAllItems = salesWithTotal.reduce((total, sale) => total + sale.total, 0);

        res.json({total: totalOfAllItems,});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/thisWeekSales", async (req, res) => {
    try {
        const today = new Date();
        const thisWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

        const thisWeekSales = await sales.findAll({
            attributes: ['id', 'itemquantity', 'itemprice', 'updatedAt'],
            where: {
                updatedAt: {
                    [Op.between]: [new Date(thisWeekStart.setHours(0, 0, 0, 0)), new Date(today.setHours(23, 59, 59, 999))],
                },
            },
        });
        const salesWithTotal = thisWeekSales.map((sale) => ({
            id: sale.id,
            itemname: sale.itemname,
            itemquantity: sale.itemquantity,
            itemprice: sale.itemprice,
            updatedAt: sale.updatedAt,
            total: sale.itemquantity * sale.itemprice,
        }));
        const totalOfAllItems = salesWithTotal.reduce((total, sale) => total + sale.total, 0);

        res.json({total: totalOfAllItems,});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/lastWeekSales", async (req, res) => {
    try {
        const today = new Date();
        const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 1);

        const lastWeekSales = await sales.findAll({
            attributes: ['id', 'itemquantity', 'itemprice', 'updatedAt'],
            where: {
                updatedAt: {
                    [Op.between]: [new Date(lastWeekStart.setHours(0, 0, 0, 0)), new Date(lastWeekEnd.setHours(23, 59, 59, 999))],
                },
            },
        });
const salesWithTotal = lastWeekSales.map((sale) => ({
            id: sale.id,
            itemname: sale.itemname,
            itemquantity: sale.itemquantity,
            itemprice: sale.itemprice,
            updatedAt: sale.updatedAt,
            total: sale.itemquantity * sale.itemprice,
        }));

        const totalOfAllItems = salesWithTotal.reduce((total, sale) => total + sale.total, 0);

        res.json({total: totalOfAllItems,});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




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