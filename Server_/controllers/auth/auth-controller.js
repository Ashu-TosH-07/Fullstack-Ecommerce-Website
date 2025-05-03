const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//Register a new user

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exist",
      });

    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashpassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User dosen't exist.",
      });

    const checkPWmatch = await bcrypt.compare(password, checkUser.password);

    if (!checkPWmatch)
      return res.json({
        success: false,
        message: "Incorrect Password!",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in Successfully.",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });

    res.status(200).json({
      success: true,
      message: "Logged in Successfully.",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

//Logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out Successfully. ",
  });
};

//Middleware

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unautherized User!",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: console.log(error) || "Unautherized User!",
//     });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from the Authorization header
  // const token = req.cookies.token; // If using cookies instead of headers
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unautherized User!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: console.log(error) || "Unautherized User!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
