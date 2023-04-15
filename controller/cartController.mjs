import Cart from "../Models/Cart.mjs";

export const addCart = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("User not authenticated.");
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      const newCart = new Cart({
        user: req.user._id,
        items: [],
      });
      await newCart.save();
    }
    const cartItems = req.body;
    cart.items.push(cartItems);
    await cart.save();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server error." });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(cart.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
