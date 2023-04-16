import Cart from "../Models/Cart.mjs";
import jwt from "jsonwebtoken";

const addCart = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  try {
    let cart = await Cart.findOne({ user: userId }); // Search for cart with user id

    if (cart) {
      // Update existing cart
      cart.cartItems[0] = req.body;
      cart = await cart.save();
      return res.status(201).json({ message: "Cart updated", cart });
    } else {
      // Create new cart
      const newCart = new Cart({
        user: userId,
        cartItems,
      });
      const savedCart = await newCart.save();
      return res.status(201).json({ message: "Cart created", cart: savedCart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating cart" });
  }
};

export { addCart };

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
