import foodmodel from "../models/foodmodel.js";
import fs from 'fs';

//add food item
const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodmodel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,

    })
    try {
        await food.save()
        res.json({success: true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

//Display all food list

const listFood = async (req,res) => {
    try {
        const foods = await foodmodel.find({})
        res.json({success: true, data: foods})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//remove food
const removeFood = async (req,res) => {
    try {
        const food =await foodmodel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,() => {})

        await foodmodel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {addFood, listFood, removeFood}