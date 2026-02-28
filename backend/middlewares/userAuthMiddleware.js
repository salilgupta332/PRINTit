const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("VERIFY SECRET:", process.env.JWT_SECRET);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);              // 👈 ADD THIS
  console.log("SECRET USED:", process.env.JWT_SECRET); // 👈 ADD THIS
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED ROLE:", decoded.role);
     console.log("DECODED:", decoded);     

    // ✅ Allow only students
    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Student access required" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
