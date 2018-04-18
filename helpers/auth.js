module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'You Must Be Logged In To Access This Page');
        res.redirect('/users/login');
    }
}