import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  console.log("userAuth middleware called");

  const { token } = req.cookies;
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token found in cookies");
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    console.log("Verifying token with secret");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);

    if (decoded.id) {
      req.userId = decoded.id;
      console.log("UserId set to:", decoded.id);
      next();
    } else {
      console.log("Token missing id field");
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed. Please login again.",
    });
  }
};

export default userAuth;
