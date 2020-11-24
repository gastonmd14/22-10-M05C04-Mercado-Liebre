var userData = require('../data/user')

module.exports = function (req, res, next) {

    if(req.session.recordame && !req.session.user) {
        let user = userData.findByEmail(req.cookie.recordame)
        req.session.user = user.email
    }
    next()
}
