const {QueryTypes} = require('sequelize');

const {sequelize}=require('../utils/database');


module.exports.checkLogin = (req, res, next) => {
  if (!req.session.user) {
    req.session.isLogedin = false;
    next();

  } else {
    // Profile.findById(req.session.user)
    sequelize.query
    ('SELECT        ID, DesEn, DesFa, Email, password '
    +'FROM            TbEntity '
    +'WHERE        (RecStatus > 0) AND (Email = :Email) AND (password = :Password)',{
        replacements:{Email:req.session.user.Email,Password:req.session.user.password},
        type:QueryTypes.SELECT
    })
      .then((user) => {
        req.session.isLogedin = true;
        req.user = user;
        return Promise.resolve(user);
      })
      .catch((err) => {
        console.log(err);
        req.session.isLogedin = false;
        req.session.destroy();
        next();
      });
      next()
  }
};

module.exports.loginRequired = (req , res , next) => {
    if(req.session.isLogedin){
      next();
    } else {
      req.flash("middlewareError" , "ابتدا وارد حساب کاربری خود شوید.");
      return res.redirect(req.headers.referer || '/');
    }
  }