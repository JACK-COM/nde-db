import express, { Express } from "express";
import { AuthenticateOptions, PassportStatic } from "passport";

// AUTH ROUTES
const GOOGLE_LOGIN = "/login/google";
const GOOGLE_LOGOUT = "/logout/google";
const LOGGED_IN = "/authenticated";
const GOOGLE_LOGIN_REDIRECT = "/oauth2/redirect/google";
const UI_REDIRECT = "http://localhost:3000/login";

export default function configureAuthRoutes(
  app: Express,
  passport: PassportStatic
) {
  const AuthRouter = express.Router();
  // Trigger "Sign in with Google"
  AuthRouter.get(
    GOOGLE_LOGIN,
    passport.authenticate("google", { scope: ["email"] })
  );

  // Complete "Sign in with google"
  const opts: AuthenticateOptions = {
    failureRedirect: GOOGLE_LOGIN,
    failureMessage: true,
    session: true,
    successRedirect: UI_REDIRECT
  };

  AuthRouter.get(GOOGLE_LOGIN_REDIRECT, passport.authenticate("google", opts));

  // Check logged in
  AuthRouter.post(LOGGED_IN, function (req, res, _next) {
    res.json({ user: req.isAuthenticated() ? req.user : null });
  });

  // Logout
  AuthRouter.get(GOOGLE_LOGOUT, function (req, res, next) {
    req.logout(function (err) {
      if (err) return next(err);
      req.session.destroy(() =>
        res.clearCookie("user").clearCookie("token").redirect(UI_REDIRECT)
      );
    });
  });

  app.use("/", AuthRouter);
}
