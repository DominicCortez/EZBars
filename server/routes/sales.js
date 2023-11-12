const express = require('express')
const router = express.Router()
const { sales } = require('../models')
const { Op } = require('sequelize');


router.get("/dailySales", async (req, res) => {
    try {
      const today = new Date();
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
  
      // Calculate the start date as 4 months ago
      const startDate = new Date();
      startDate.setMonth(today.getMonth() - 4); // Adjusted to cover the past 4 months
      const startOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1, 0, 0, 0, 0);
  
      const monthlySales = await sales.findAll({
        attributes: ['itemquantity', 'itemprice', 'updatedAt'],
        where: {
          updatedAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
  
      const salesData = Array.from({ length: 4 }, (_, i) => {
        const monthStartDate = new Date(startOfMonth);
        monthStartDate.setMonth(startOfMonth.getMonth() + i);
        const monthEndDate = new Date(monthStartDate.getFullYear(), monthStartDate.getMonth() + 1, 0, 23, 59, 59, 999);
  
        const monthlySalesForMonth = monthlySales
          .filter((sale) => sale.updatedAt >= monthStartDate && sale.updatedAt <= monthEndDate)
          .reduce((total, sale) => total + sale.itemquantity * sale.itemprice, 0);
  
        return {
          month: monthStartDate.toISOString().split('T')[0],
          sales: monthlySalesForMonth,
        };
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
    try{
        const listOfItems = await sales.findAll();
        res.json(listOfItems);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.post("/" , async (req, res) => {
    try{
        const salesreq = req.body;
        await sales.create(salesreq)
        res.json(salesreq)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
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
    try{
        const {newItemCategory , id} = req.body;
        await sales.update({itemcategory: newItemCategory},{where:{id : id} })
        res.json(newItemCategory);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});
router.put("/itemname" , async (req, res) => {
    try{
        const {newItemName , id} = req.body;
        await sales.update({itemname: newItemName},{where:{id : id} })
        res.json(newItemName);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/itemdescription" , async (req, res) => {
    try{
        const {newItemDescription , id} = req.body;
        await sales.update({itemdescription: newItemDescription},{where:{id : id} })
        res.json(newItemDescription);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put("/itemnumber" , async (req, res) => {
    try{
        const {newItemNumber , id} = req.body;
        await sales.update({itemnumber: newItemNumber},{where:{id : id} })
        res.json(newItemNumber);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});
router.put("/itemquantity" , async (req, res) => {
    try{
        const {newItemQuantity , id} = req.body;
        await sales.update({itemquantity: newItemQuantity},{where:{id : id} })
        res.json(newItemQuantity);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/itemprice" , async (req, res) => {
    try{
        const {newItemPrice , id} = req.body;
        await inventory.update({itemprice: newItemPrice},{where:{id : id} })
        res.json(newItemQuantity);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

router.get("/fastSellingItems", async (req, res) => {
    try {
        const today = new Date();
        const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);

        const highQuantityItems = await sales.findAll({
            attributes: ['id', 'itemname', 'itemquantity', 'updatedAt'],
            where: {
                itemquantity: {
                    [Op.gte]: 30,
                },
                updatedAt: {
                    [Op.between]: [new Date(lastWeekStart.setHours(0, 0, 0, 0)), new Date(today.setHours(23, 59, 59, 999))],
                },
            },
        });

        res.json(highQuantityItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        await sales.destroy({
            where:{
                id: id,
            },
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

module.exports = router;