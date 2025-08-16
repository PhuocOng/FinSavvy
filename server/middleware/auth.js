// Auth middleware, error handler
const jwt = require("jsonwebtoken");
const userAuth = async(req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        //return res.json({success: false, message: "Not Authorized. Login again"})
        return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Case 1: guest user:
        if (tokenDecode.userType === "guest") {
           // req.user = { userType: "guest" };
            req.user = { id: tokenDecode.id, userType: "guest" };
            return next()
        }

        // Case 2: real user (has id)
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id }
            return next();

        } else {
            return res.status(401).json({ success: false, message: "Not Authorized. Login again" });
        }  

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

module.exports = userAuth;