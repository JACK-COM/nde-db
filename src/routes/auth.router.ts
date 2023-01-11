import express from "express";
import GoogleStrategy from "passport-google-oidc";
import { context, passport } from "../graphql/context";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SK;
const PORT = process.env.PORT;
export const redirectURL = "oauth2/redirect/google";
const callbackURL = `http://localhost:${PORT}/${redirectURL}`;

passport.use(
  new GoogleStrategy({ clientID, clientSecret, callbackURL }, function verify(
    issuer,
    profile,
    cb
  ) {
    console.log(issuer, profile);
    cb(null, profile.email);
  })
);

export async function login() {
  return passport.authenticate("google", { scope: ["email"] });
}

export async function loginRedirect(_req, res) {
  res.send("You logged in, buddeh");
}

const AuthRouter = express.Router();
// AuthRouter.post("/signup", signUp);
AuthRouter.get("/login", login);
AuthRouter.get(
  `/${redirectURL}`,
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true
  }),
  loginRedirect
);

export default AuthRouter;
