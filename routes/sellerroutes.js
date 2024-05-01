const sellercontroller=require("../controllers/sellercontroller")

const express=require("express")
const sellerrouter=express.Router()


sellerrouter.post("/checksellerlogin",sellercontroller.checksellerlogin)
sellerrouter.post("/addpet",sellercontroller.addpet)
sellerrouter.get("/viewpets/:runame",sellercontroller.viewpets)

sellerrouter.get("/viewpetapplicants/:runame",sellercontroller.viewpetapplicants)
sellerrouter.post("/changepetstatus",sellercontroller.changepetstatus)


module.exports = sellerrouter