module.exports = objectRepository => (req, res, next) => {
    req.user = { id: 456 };
    next();
};
