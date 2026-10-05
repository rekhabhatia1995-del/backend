
const User = require("../model/AuthModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  try {
    const {full_name,email,phone_number,company_name,GST_number, business_type,password, confirm_password} = req.body;

    if (!full_name ||!email ||!phone_number ||!company_name ||!GST_number ||!business_type ||!password ||!confirm_password ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Password and confirm password do not match"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({full_name,email, phone_number,company_name, GST_number, business_type,password: hashedPassword,confirm_password: hashedPassword
    });

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    console.log("Register API error:", err);

    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};


const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        email: user.email
      }
    });

  } catch (err) {
    console.log("Login API error:", err);

    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
const Logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message
    });
  }
};
 

const UpdateCatageryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({
        message: "Status must be true or false"
      });
    }

    const catagery = await Catagery.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!catagery) {
      return res.status(404).json({
        message: "Catagery not found"
      });
    }

    return res.status(200).json({
      message: "Catagery status updated successfully",
      catagery
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


const Status = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({
        message: "Status must be true or false"
      });
    }

    const catagery = await Catagery.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!catagery) {
      return res.status(404).json({
        message: "Catagery not found"
      });
    }

    return res.status(200).json({
      message: "Catagery status updated successfully",
      catagery
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",error: error.message
    });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Password reset request successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const {email,new_password,confirm_password} = req.body;

    if (!email || !new_password || !confirm_password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    user.password = hashedPassword;
    user.confirm_password = hashedPassword;

    await user.save();

    return res.status(200).json({
  
      message: "Password reset successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",error: error.message
    });
  }
};


const GetProfile = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email })
      .select("-password -confirm_password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error", error: error.message
    });
  }
};


const UpdateProfile = async (req, res) => {
  try {
    const {email,full_name,phone_number,company_name,GST_number,business_type} = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.full_name = full_name || user.full_name;
    user.phone_number = phone_number || user.phone_number;
    user.company_name = company_name || user.company_name;
    user.GST_number = GST_number || user.GST_number;
    user.business_type = business_type || user.business_type;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



module.exports = {Register,Login,Logout,UpdateCatageryStatus,Status,ForgotPassword,ResetPassword, GetProfile, UpdateProfile};

