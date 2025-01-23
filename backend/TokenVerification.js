const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(401).json('Invalid token');
            }
            req.user = user
            console.log('token successfully verified');
            
            next();
        })
    }
    else {
        return res.status(401).json('Unauthorized access');
    }

}

module.exports = verifyToken;
