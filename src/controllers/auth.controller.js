const passport = require('passport');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

async function signUp (req, res) {
    let user = req.body;

    try {
        newUser = await authService.signUp(user);
        console.log('User registration successful');
        res.status(201).json({
            status : 'success',
            message : 'User registered successful',
            user : {
                id : newUser._id,
                name : newUser.name,
                username : newUser.username,
                email : newUser.email
            }
        })
    } catch (err) {
        console.log('Error while signup', err);
        res.status(500).json({
            status : 'fail',
            message : 'Something went wrong'
        })
    }
}

async function logIn (req, res) {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if( err || !user) {
                    return res.status(404).json({
                        status : 'fail',
                        message : 'Something went wrong'
                    })
                }
                req.login(
                    user,
                    {session : false},
                    async (err) => {
                        if(err) return next(err)
                        const body = {_id : user._id, email : user.email, roles : user.roles};
                        const token = jwt.sign(
                            body,
                            authConfig.SECRET_KEY,
                            {
                                expiresIn : authConfig.EXPIRES_AT
                            }
                        );
                        return res.status(202).json({
                            status : 'success',
                            message : 'User logged-in successfully',
                            accessToken : `Bearer ${token}`
                        })
                    }
                )
            } catch (err) {
                console.log(err);
            }
        }
    ) (req, res);
}

module.exports = {
    signUp,
    logIn
}