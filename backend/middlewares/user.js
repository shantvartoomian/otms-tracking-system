

module.exports.loginRequired = (req , res , next) => {
    if(req.session.isLogedin){
      next();
    } else {
      req.flash("middlewareError" , "ابتدا وارد حساب کاربری خود شوید.");
      return res.redirect(req.headers.referer || '/');
    }
  }