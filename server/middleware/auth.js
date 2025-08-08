// Auth middleware, error handler
const jwt = require("jsonwebtoken");
const userAuth = async(req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return res.json({success: false, message: "Not Authorized. Login again"})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Case 1: guest user:
        if (tokenDecode.userType === "guest") {
            req.user = { userType: "guest" };
            return next()
        }

        // Case 2: real user (has id)
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id }

        } else {
            return res.json({success: false, message: "Not Authorized. Login again"})
        }  
        next();    

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

module.exports = userAuth;