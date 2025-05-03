const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const User = require("../../models/User");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
      message: "Product added to cart!",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};

const fetchCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required!",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "_id title image price salePrice",
      model: "Product",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validCartItems = cart.items.filter(
      (productItem) => productItem.productId !== null
    );
    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }

    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : "Product not found",
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart!",
      });
    }
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "_id title image price salePrice",
      model: "Product",
    });
    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : "Product not found",
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
      message: "Product updated in cart!",
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid details!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "_id title image price salePrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId.toString()
    );

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "_id title image price salePrice",
    });
    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      title: item.productId ? item.productId.title : "Product not found",
      image: item.productId ? item.productId.image : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
      message: "Product deleted from cart!",
    });
  } catch (error) {
    console.error("Error deleting cart Item:", error);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};

module.exports = { addToCart, updateCartItem, deleteCartItem, fetchCartItem };
