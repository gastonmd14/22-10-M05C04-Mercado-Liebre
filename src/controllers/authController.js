var userData = require("../data/user");
var bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const controller = {

  login: function(req, res) { 
    res.render('auth-login-form')
  }, 

  processlogin: function(req, res) { 
    
    let user = userData.findByEmail(req.body.email)

    if(!user) {
      return res.send('Email Incorrecto')
    } else if (bcryptjs.compareSync(req.body.password, user.password)) {
        req.session.user = user.email
        console.log(req.session);                                       
       if(req.body.recordame) {
         res.cookie('recordame', user.email, {maxAge: 120 * 1000})                                                        
       }
      return res.redirect('/products')

      } else {
        return res.send('Password Incorrecto')
      }
  },

  logout: function(req, res) {
    req.session.destroy();
    res.cookie('recordame', null, {maxAge: 0});
    return res.redirect('/products');
  },


  create: function (req, res) {
    let errors = {};
    res.render("auth-register-form", {errors});
  },

  store: function (req, res) {
    // console.log(errors);
    // console.log(req.body);

    let errors = validationResult(req)
    
    if (errors.isEmpty()) { 

      userData.createUser({

        email: req.body.email,   

        password: bcryptjs.hashSync(req.body.password)

    });

    res.send("Usuario Creado");

  } else {
    // console.log(errors.mapped());
    // console.log(req.body);
        
    return res.render('auth-register-form', {errors: errors.mapped()})

   

  }
}
}

module.exports = controller;
