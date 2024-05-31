if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const User = require('../model/user')
const ExpressError = require('../utils/ExpressError')

const verifyJWT = catchAsync(async (req, res, next) => {
    try {
        const token = req.cookies.userToken
        if (!token) {
            return next(new ExpressError('Unauthorized ', 401))
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.clearCookie('userToken', { httpOnly: true, secure: false });
                return next(new ExpressError('Unauthorized ', 401))
            }

            const user = await User.findById(decoded.id).select('-password -email');;
            if (user) {
                delete user.password;
                delete user.email;
                req.user = user; // Attach user information to request object
                next();
            }
            else {
                res.clearCookie('userToken', { httpOnly: true, secure: false });
                return next(new ExpressError('Unauthorized ', 401))
            }

        });

    } catch (error) {
        res.clearCookie('userToken', { httpOnly: true, secure: false });
        return next(new ExpressError('something whent wrong ', 500))
    }
})

module.exports = verifyJWT;


