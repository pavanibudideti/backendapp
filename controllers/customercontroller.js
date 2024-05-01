const Customer = require("../models/Customer")
const Pet = require("../models/Pet")
const PetApplicant = require("../models/PetApplicant")

const insertcustomer = async (request, response) => {
    try 
    {
      const input = request.body;
      const customer = new Customer(input);
      await customer.save();
      response.status(200).send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const updatecustomerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const customer = await Customer.findOne({ email });
      if (!customer) 
      {
        response.status(200).send('Customer not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          customer[key] = input[key];
        }
      }
      await customer.save();
      response.status(200).send('Customer Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };


  const checkcustomerlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const customer = await Customer.findOne(input)
       response.json(customer)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const customerprofile = async (request, response) => 
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

  const viewpetsbycustomer = async (request, response) => 
 {
    try 
    {
      const pets = await Pet.find();
      if(pets.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(pets);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const appliedpets = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const appliedpets = await PetApplicant.find({"customeremail":email});
      if(appliedpets.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(appliedpets);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const applypet = async (request, response) => {
    try 
    {
      const input = request.body; // pet id and customer mail id
      const alreadyapplied = await PetApplicant.findOne(input)
      if(!alreadyapplied)
      {
        const petapplicant = new PetApplicant(input);
        await petapplicant.save();
        response.status(200).send('Pet Applied Successfully');
      }
      else
      {
        response.status(200).send('OOPS ... You have already applied for this Pet');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };


  module.exports = {insertcustomer,checkcustomerlogin,updatecustomerprofile,customerprofile,viewpetsbycustomer,applypet,appliedpets}