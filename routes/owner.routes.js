const express = require('express');
const Router = express.Router();
const ownerModel = require("../models/owner.models.js")
const debug = require('debug')("Development:OwnerRoutes")

Router.get("/", (req, res) => {
    res.send("This is me");
})

if (process.env.NODE_ENV === "Development") {
    Router.post("/create", async (req, res) => {
      try {
        const checker = await ownerModel.find();
        if(checker.length > 0){
            return res.status(404).send("Out of bounds route");
        }
        const {fullname,username,email,password,picture} = req.body;
        const owner = await ownerModel.create({
            fullname,username,email,password,picture
        });
        if(owner){
            res.send(`Welcome ${owner.username}`);
        }
      } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(404).send(error.message);
        }
        debug(error.message);
        res.status(404).send("Internal Server Error");
      }
    })

}


module.exports = Router;