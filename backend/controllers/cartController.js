import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    
    // Check if userData exists
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }
    
    let cartData = userData.cartData;
    
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error.message });
  }
};


// remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    
    // Check if userData exists
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      return res.json({ success: true, message: "Cart is already empty" });
    }
    
    let cartData = userData.cartData;
    
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      delete cartData[req.body.itemId];
    }
    
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error.message });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    
    // Check if userData exists
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }
    
    let cartData = userData.cartData;
    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error.message });
  }
};


export { addToCart, removeFromCart, getCart };
