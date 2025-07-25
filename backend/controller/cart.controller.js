import User from "../models/user.model.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
