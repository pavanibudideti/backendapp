const Seller = require("../models/Seller")
const Pet = require("../models/Pet")
const PetApplicant = require("../models/PetApplicant")

const checksellerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const seller = await Seller.findOne(input)
     response.json(seller)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const addpet = async (request, response) => {
  try 
  {
    const input = request.body;
    const pet = new Pet(input);
    await pet.save();
    response.status(200).send('Pet Posted Successfully');
  } 
  catch(e) 
  {
    console.log(e.message)
    response.status(500).send(e.message);
  }
};

const viewpets = async (request, response) => 
 {
    try 
    {
      const runame = request.params.runame
      const pets = await Pet.find({"seller.username":runame});
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

  const viewpetapplicants = async (request, response) => 
  {
    try 
    {
        const runame = request.params.runame;
        const pets = await Pet.find({ "recruiter.username": runame });

        if (pets.length === 0) 
        {
            return response.status(200).send("No pets found for this recruiter");
        }
        else
        {
          const petIds = pets.map(pet=> pet.petid);

          const petApplicants = await PetApplicant.find({ petid: { $in: petIds } });
  
          if (petApplicants.length === 0) 
          {
              return response.status(200).send("No pet applicants found for this job");
          }
          else
          {
            response.json(petApplicants);
          }
        }
    } 
    catch (error) 
    {
        response.status(500).send(error.message);
    }
};

const changepetstatus = async (request, response) => 
{
  try 
  {
    const { applicantId, status } = request.body;

    if (!applicantId || !status) 
    {
      return response.status(400).send('Applicant ID and status are required');
    }

    await PetApplicant.findOneAndUpdate(
      { applicantId },
      { $set: { petStatus: status } },
      { new: true } // it will return updated document
    );

    response.status(200).send('Pet Status Updated Successfully');
  } catch (error) {
    response.status(500).send(error.message);
  }
};



 module.exports = {checksellerlogin,addpet,viewpets,viewpetapplicants,changepetstatus}