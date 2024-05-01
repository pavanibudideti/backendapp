//admin routes
const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()


adminrouter.get("/viewcustomers",admincontroller.viewcustomers)
adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)

adminrouter.post("/addseller",admincontroller.addseller)
adminrouter.get("/viewsellers",admincontroller.viewsellers)
adminrouter.delete("/deleteseller/:username",admincontroller.deleteseller)
adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)

adminrouter.get("/analysis",admincontroller.analysis)
adminrouter.get("/viewcustomerprofile/:email",admincontroller.viewcustomerprofile)


// upload and display events with images

// adminrouter.post("/createservice",admincontroller.createservice)
// adminrouter.get("/viewservices",admincontroller.vieweservices)
// adminrouter.get("/serviceimage/:filename",admincontroller.serviceimage)


module.exports = adminrouter

