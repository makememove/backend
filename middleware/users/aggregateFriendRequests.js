module.exports = () => (req, res, next) => {
    let friends = [];
    friends = friends.concat(res.locals.sent);
    friends = friends.concat(res.locals.requests);
    res.locals.user.friends = friends;
    delete res.locals.sent;
    delete res.locals.requests;
    return next();
};
