// module.exports = (req, res, next) => {
//   // checks if the user is logged in when trying to access a specific page
//   if (!req.session.user) {
//     return res.redirect("/auth/login");
//   }
//   req.user = req.session.user;
//   next();
// };

const isLoggedIn = (req, res, next) => {
  if(req.session.currentUser){
      next();
  } else {
      res.redirect("/login")
  }
}

module.exports = isLoggedIn;