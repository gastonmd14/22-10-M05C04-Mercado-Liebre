
const controller = {

    login: function(req, res) {
        res.render('auth-login-form')
    },

    processlogin: function(req, res) {
        res.send('Usuario logueado')
    },

    register: function(req, res) {
        res.render('auth-register-form')
    },

    processregister: function(req, res) {
        res.send('Usuario Creado')
    },

}

module.exports = controller;