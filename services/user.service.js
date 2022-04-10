const User = require('../models/user');
const logger = require('../utils/logger');

module.exports.authenticate = async function authenticate(username, password) {
    logger.info("user.service.js - authenticate");

    const user = await User.findOne({ username: username });

    if (user) {
        return user.verifyPassword(password);
    }

    // User not found.
    return null;
}
