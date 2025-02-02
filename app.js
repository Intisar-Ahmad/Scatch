const cookieParser = require('cookie-parser');
const express = require('express');
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require('./config/ConnetDB.js')
const usersRoutes = require('./routes/users.routes.js')
const ownerRoutes = require('./routes/owner.routes.js')
const productsRoutes = require('./routes/products.routes.js')
const app = express();
const port = 3000;
dotenv.config();

connectDB();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use("/owner",ownerRoutes)
app.use("/users",usersRoutes)
app.use("/products",productsRoutes)
app.set('view engine','ejs');


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})