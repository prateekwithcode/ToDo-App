import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";

// GET CURRENT USER
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id).select("name email");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
}

// UPDATE USER

export async function updateProfile(req, res) {
  const { name, email } = req.body;

  if (!name || !email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Valid name and email required" });
  }

  try {
    const exists = await User.findOne({ email, _id: { $ne: req.user._id } });

    if (exists) {
      res
        .status(409)
        .json({
          success: false,
          message: "Emal already in use by another account",
        });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true, select: "name email" },
    );

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
}

// CHANGE PASSWORD

export async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || !newPassword.length < 6) {
    return res
      .status(400)
      .json({ success: true, message: "Password invalid or too short" });
  }

  try {
    const user = await User.findById(req.user._id).select("password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
        return res
        .status(401)
        .json({ success: false, message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword,10);
    await user.save();

    res.status(200).json({
        success:true,
        message:"Password changed"
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server" });
  }
};


