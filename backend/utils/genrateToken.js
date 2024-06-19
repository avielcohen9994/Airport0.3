const jwt = require('jsonwebtoken') ;

const generateTokenAndSetCookie = (userid, res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: 60 * 1000
    });
    
    res.cookie('jwt', token , {
        // httpOnly: true,
        // sameSite: "strict",
        // secure: process.env.NODE_ENV !== 'development'
    });
};

module.exports = {generateTokenAndSetCookie}