let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()
    
   
    //create a model
    let Pet = require('../models/Pets')
    

    //create a pet
    
    router.post('/add', async (req,res) => {
       
           const pet = new Pet({
               _id:req.body._id,
               name:req.body.name,
               animal:req.body.animal,
               breed:req.body.breed,
               age:req.body.age,
               friendly:req.body.friendly,
               
           })
          try{
              const newPet = await pet.save()
              console.log(req.body)
              res.status(201).json(newPet)
       
       }catch (err){
        res.status(400).json({message:err.message})
       }
    })
    
    //Get one of the pets
 router.get('/get/byid/:id',getPet,(req,res) => {
 res.json(res.pet)
 })
    //Get one of the pets by name
 router.get('/get/byname/:name', async (req,res) => {
    let pets 
    try {
        pets = await Pet.find({name:req.params.name})
        console.log(pets)

        if(pets == null) {
            return res.status(404).json({message: 'This animal is not yet in the database'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    res.json(pets)

})

    //Get all pets
router.get('/get', async (req,res) => {
   try{
    const pets = await Pet.find()
    res.json(pets)
   }catch (err){
    res.status(500).json({message:err.message})
   }
})

// Update pet info 
// patch helps edit only the params which You've decided to provide without reseting all of them (PUT)
router.patch('/update/:id',getPet,async (req,res) => {
    if(req.body.name!=null){
        res.pet.name = req.body.name}
    if(req.body.animal!=null){
        res.pet.animal = req.body.animal}
    if(req.body.age!=null){
        res.pet.age = req.body.age}
    if(req.body.friendly!=null){
        res.pet.friendly = req.body.friendly}
     try {
        const updatedPet = await res.pet.save()
        await console.log(req.body)
        res.json(updatedPet)
     } catch {
         res.status(400).json({message:err.message})

     }


})
    //Delete pet from the list
router.delete('/delete/:id',getPet,async (req,res) => {
    try{
        const deletedPet = await res.pet.name
        res.pet.remove()
        // await res.pet.remove()
        res.json({message: `${deletedPet} left the database`})
    } catch {
        res.status(400).json({message:err.message})
    }

})


    //reset the list
router.delete('/reset', async (req,res)=> {
    try{
       await Pet.deleteMany()
        await res.json({message: `You've just emptied the database...`})
      
    } catch (err) {
        res.status(500).json({message:err.message})
    }

})


//find pet by ID 

async function getPet(req,res,next){
    let pet
    try{
        pet = await Pet.findById(req.params.id)
        if(pet == null) {
            return res.status(404).json({message: 'This animal is not yet in the database'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    res.pet= pet
    next()

}



module.exports = router