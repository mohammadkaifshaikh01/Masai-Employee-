import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()
const authMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized access (authMiddleware)!!"
			});
		}
		jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
			if (error) {
				return res.status(401).json({
					message: error,
					success: false
				});
			}
			req.user = decoded;
			next();
		})
	} catch (error) {
		return res.status(502).json({
			message: `Error while verifying the token: ${error.message}`,
			success: false
		})
	}
}

export default authMiddleware;