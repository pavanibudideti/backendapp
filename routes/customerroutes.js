const customercontroller=require("../controllers/customercontroller")



const express = require("express")
const customerrouter = express.Router()

// customer routes
customerrouter.post("/insertcustomer",customercontroller.insertcustomer)
customerrouter.post("/checkcustomerlogin",customercontroller.checkcustomerlogin)
customerrouter.put("/updatecustomerprofile",customercontroller.updatecustomerprofile)
customerrouter.get("/customerprofile/:email",customercontroller.customerprofile)

customerrouter.get("/viewpetsbycustomer",customercontroller.viewpetsbycustomer)
customerrouter.post("/applypet",customercontroller.applypet)
customerrouter.get("/appliedpets/:email",customercontroller.appliedpets)



module.exports = customerrouter