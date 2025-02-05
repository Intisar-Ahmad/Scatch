const express = require('express');
const Router = express.Router();
const ownerModel = require("../models/owner.models.js")
const debug = require('debug')("Development:OwnerRoutes")

Router.get("/", async  (req, res) => {
  try {
    const owner = await ownerModel.findOne({_id:"67a38f608f88a9543b12dffc"});
   return res.render("ownerDashboard",{owner});
  } catch (error) {
    debug("Error fetching owner",error.message);
    res.status(500).send("Error fetching owner");
  }
   
})
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "Development") {
    Router.post("/create", async (req, res) => {
      try {
        const checker = await ownerModel.find();
        if(checker.length > 0){
            return res.status(404).send("Out of bounds route");
        }
        const {fullname,username,email,password,picture} = req.body;
        if(picture){
          const owner = await ownerModel.create({
            fullname,username,email,password,picture
        });
           if(owner){
          res.send(`Welcome ${owner.username}`);
      }
        } else{
          const owner = await ownerModel.create({
            fullname,username,email,password
        });
        if(owner){
          res.send(`Welcome ${owner.username}`);
      }
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