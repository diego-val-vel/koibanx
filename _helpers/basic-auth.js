const userService = require('../services/user.service');
const logger = require('../utils/logger');

async function basicAuth(req, res, next) {
    logger.info("basic-auth.js - basicAuth");

    // Check for basic auth header.
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // Verify auth credentials.
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const isValidUser = await userService.authenticate(username, password);

    if (!isValidUser || (isValidUser === null)) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    // Attach user to request object.
    // req.user = user;

    next();
}

module.exports = basicAuth;
