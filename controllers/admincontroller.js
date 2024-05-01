const Customer = require("../models/Customer")
const Admin= require("../models/Admin")
const Seller=require("../models/Seller")
const Pet = require("../models/Pet")
const PetApplicant = require("../models/PetApplicant")
const Service = require("../models/Service")

const multer = require('multer')
const path = require('path')
const fs = require('fs')


 const viewcustomers = async (request, response) => 
 {
    try 
    {
      const customers = await Customer.find();
      if(customers.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  

  const deletecustomer = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const customer = await Customer.findOne({"email":email})
      if(customer!=null)
      {
        await Customer.deleteOne({"email":email})
        response.status(200).send("Customer Deleted Successfully")
      }
      else
      {
        response.status(200).send("Customer Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const addseller = async (request, response) => {
    try 
    {
      const input = request.body;
      const seller = new Seller(input);
      await seller.save();
      response.status(200).send('Seller Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewsellers = async (request, response) => 
 {
    try 
    {
      const sellers = await Seller.find();
      if(sellers.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(sellers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deleteseller = async (request, response) => 
 {
    try 
    {
      const uname = request.params.username
      const seller = await Seller.findOne({"username":uname})
      if(seller!=null)
      {
        await Seller.deleteOne({"username":uname})
        response.status(200).send("Seller Deleted Successfully")
      }
      else
      {
        response.status(200).send("Seller Username Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const changeadminpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
      {
        response.status(400).send('Invalid Old Password');
      }
      else
      {
          if(oldpassword==newpassword)
          {
            response.status(400).send('Both Passwords are Same');
          }
          else
          {
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  
  
const analysis = async (req, res) => {
  try 
  {
      const petCount = await Job.countDocuments();
      const petApplicantCount = await PetApplicant.countDocuments();
      const selectedCount = await PetApplicant.countDocuments({ petStatus: 'SELECTED' });
      const rejectedCount = await PetApplicant.countDocuments({ petStatus: 'REJECTED' });
      const sellerCount = await Seller.countDocuments();
      const customerCount = await Customer.countDocuments();

      res.json({petCount,petApplicantCount,selectedCount,rejectedCount,sellerCount,customerCount});
  } 
  catch (error) 
  {
      res.status(500).send(error.message);
  }
};

const viewcustomerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const customer = await Customer.findOne({email})
        if(customer)
        {
          response.json(customer)
        }
        else
        {
          return response.status(200).send('Customer not found with the provided email id');
        }
        
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './media/'); // Destination folder
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); // File naming convention
      }
    });
    
    const upload = multer({ storage: storage }).single('file');
    

    const createservice = async (req, res) =>
    {
      try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { category, title, description, date, location } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newService = new Service({
            category,
            title,
            description,
            date,
            location,
            file: fileName // Save only the file name
          });
    
          await newService.save();
          res.status(200).send('Service Created Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };
    

const viewservices = async (req, res) => 
{
  try 
  {
    const services = await Service.find();
    res.status(200).json(services);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const serviceimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}


  module.exports = {viewcustomers,deletecustomer,checkadminlogin,addseller,viewsellers,deleteseller,changeadminpwd,analysis,viewcustomerprofile,createservice,viewservices,serviceimage}