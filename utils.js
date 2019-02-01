const jwt = require('jsonwebtoken');

const generateToken = payload => {
    const options = { expiresIn: '2d', issuer: 'https://john-medina.co' };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, options);
};

const validateToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        const options = {
            expiresIn: '2d',
            issuer: 'https://john-medina.co'
        };

        try {
            jwt.verify(token, process.env.JWT_SECRET, options);
            next();
        } catch (error) {
            res.status(500).send({
                error: `Something went wrong with the Token you suplied.`,
                status: 500
            });
        }

    } else {
        res.status(401).send({
            error: `Authentication error. Token required.`,
            status: 401
        });
    }
}

module.exports = { generateToken, validateToken };