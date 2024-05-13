import userModel from '../models/userModel.js'

//Add to cart
const addtoCart = async(req,res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: "Added to cart"})
    }catch (error) {
        res.json({success: false, message: error.message})
    }

}

//Remove itms from cart
const removeFromCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (cartData[req.body.itemId]){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: "Removed from cart"})
    } catch (error) {
        res.json({success: false, message: "Error"})
    }
}

//fetch user cart data
const getCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success: true, cartData})
    } catch (error) {
        res.json({success: false, message: "Error"})
    }
}


export {addtoCart,removeFromCart,getCart}