import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import 'dotenv/config.js'

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch =await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const role=user.role;
    const token = createToken(user._id);
    res.json({ success: true, token,role });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Create token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.VITE_JWT_SECRET, { expiresIn: '1d' });
};
// register user

const registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body; // Default role to "user" if not provided
  try {
    // Check if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format and password strength
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.VITE_SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      role: role, // Use the role from the request body or the default value
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, role: user.role });
  } catch (error) {
    console.error("Error in registerUser:", error); // Log the error for debugging
    res.json({ success: false, message: "Error", error: error.message });
  }
};

export { loginUser, registerUser };
