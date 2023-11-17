const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models')

//Routers
const usersRouter = require('./routes/users')
app.use("/users", usersRouter);
const inventoryRouter = require('./routes/inventory')
app.use("/inventory", inventoryRouter);
const salesRouter = require('./routes/sales')
app.use("/sales", salesRouter);
const productsRouter = require('./routes/products')
app.use("/products",productsRouter)

db.sequelize.sync().then(() =>{
app.listen(3001, () => {
    console.log("Server running on port 3001")
    });
});