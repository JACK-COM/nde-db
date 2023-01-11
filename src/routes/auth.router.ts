import express from "express";
import passport from "../services/passport";

const AuthRouter = express.Router();

// AUTH ROUTES
const GOOGLE_LOGIN = "/login/google";
const GOOGLE_LOGOUT = "/logout/google";
const GOOGLE_LOGIN_REDIRECT = "/oauth2/redirect/google";

// Trigger "Sign in with Google"
AuthRouter.get(
  GOOGLE_LOGIN,
  passport.authenticate("google", { scope: ["email"] })
);

// Complete "Sign in with google"
const opts = { failureRedirect: GOOGLE_LOGIN, failureMessage: true };
AuthRouter.get(
  GOOGLE_LOGIN_REDIRECT,
  passport.authenticate("google", opts),
  function googleRedirect(_req, res) {
    res.json({ message: "You logged in, buddeh" });
  }
);

// Logout
AuthRouter.get(GOOGLE_LOGOUT, function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect(GOOGLE_LOGIN);
  });
});

export default AuthRouter;
