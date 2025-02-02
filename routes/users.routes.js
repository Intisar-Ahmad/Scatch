const express = require('express');
const Router = express.Router();

Router.get("/",(req,res)=>{
    res.send("This is me");
})

module.exports = Router;