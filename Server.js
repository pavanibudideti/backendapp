const express = require("express")
const mongoose = require("mongoose")
const cors=require("cors")
require('dotenv').config();


//MongoDB Compass Connection
// const dburl = "mongodb://localhost:27017/sdpproject32"
// mongoose.connect(dburl).then(() => {
//     console.log("Connected DB Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });


// MongoDB Atlas Connection

const dburl = "mongodb+srv://admin:admin@cluster0.0ksy9.mongodb.net/sdpproject32?retryWrites=true&w=majority"
mongoose.connect(dburl).then(() => {
      console.log("Connected to MongoDB Atlas Successfully")
}).catch((err) => {
     console.log(err.message)
});






const app = express()
app.use(express.json())  //to parse JSON data
app.use(cors())  //cors enable the resource sharing between two applications


const adminrouter=require("./routes/adminroutes")
const customerrouter=require("./routes/customerroutes")
const sellerrouter=require("./routes/sellerroutes")

app.use("",adminrouter)
app.use("",customerrouter)
app.use("",sellerrouter)


//const ports = 2832
const port = process.env.PORT || 2832
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
