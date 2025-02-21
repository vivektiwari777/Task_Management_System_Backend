import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // `Bearer token`

    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Token Verified, User ID:", req.user.id);
        next();
    } catch (error) {
        console.log("❌ Token verification failed:", error.message);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
