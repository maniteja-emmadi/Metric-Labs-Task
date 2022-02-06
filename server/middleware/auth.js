const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("Authorization").split(" ")[1];
	console.log(token);
	if (!token) return res.status(401).json({ message: "Auth Error" });

	try {
		const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
		req.user = decoded.user;
		next();
	} catch (e) {
		console.error(e);
		res.status(500).send({ message: "Invalid Token" });
	}
};