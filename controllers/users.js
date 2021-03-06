const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};


module.exports.register = async (req, res, next) => {
    try {
      //destructure what we want from req.body
      const { email, username, password } = req.body; 
      const user = new User({email, username});
      const registeredUser = await User.register(user, password);
      // console.log(registeredUser);
      req.login(registeredUser, err => {
        if(err) return next(err) 
        req.flash('success', 'Welcome To Yelp Camp!');
        res.redirect('/campgrounds');
      });
    } catch(e) {
      req.flash('error', e.message);
      res.redirect('register');
    };
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = async (req, res, next) => {
    req.flash('success', 'welcome back!');
    const redirectURL = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;    // We don't want returnTo to stay in session so after you redirect user:
    res.redirect(redirectURL);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "GoodBye!")
    res.redirect('/campgrounds');
};