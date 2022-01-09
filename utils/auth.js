const withAuth = (req, res, next) => {
    // if user is not logged in, redirect to login
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;