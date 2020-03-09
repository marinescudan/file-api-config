function authenticator (req, res, next) {
    console.log('Authenticatating...');

    next();
}

module.exports = authenticator;