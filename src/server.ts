import "graphql-import-node";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql/index";
import { context, passport } from "./graphql/context";
import logger from "./logger";

/** Run server */
async function main() {
  const app = express();
  const apolloServer = new ApolloServer({
    context: ({ req }) => ({ ...context, user: req.user }),
    schema,
    cache: "bounded",
    persistedQueries: false
  });
  const PORT = process.env.PORT || 4001;
  const env = process.env.NODE_ENV || "development";
  const secret = process.env.JWT_SEC;

  if (!secret) throw new Error("env JWT_SEC not set: run generate-keys");

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({ secret, resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  if (env === "production") {
    const message = "Too many requests; please try again later";
    const data = { __typename: "ResponseErrorMessage", message };
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message,
      handler(opts) {
        opts.res?.status(429).send({ data });
      }
    });

    app.use(limiter);
  }

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, async () => {
    let live = "LIVE";
    if (env !== "production") {
      logger.warn(`${env} mode active`);
      live = `${live} (${env}) @${PORT}/graphql`;
    } else live = `${live} @${PORT}`;

    logger.info(live);
  });
}

main();
