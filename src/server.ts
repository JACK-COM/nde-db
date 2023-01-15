import "graphql-import-node";
import { ApolloServer } from "apollo-server-express";
import express, { Express } from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import { schema } from "./graphql/index";
import { context } from "./graphql/context";
import logger from "./logger";
import { configurePassport } from "./services/passport";

const PORT = process.env.PORT || 4001;
const env = process.env.NODE_ENV || "development";

/** Run server */
async function main() {
  const app = express();
  app.set("trust proxy", 1);

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  configureRateLimiter(app); // rate Limiter
  configurePassport(app); // passportjs

  const apolloServer = new ApolloServer({
    context: ({ req }) => ({ ...context, user: req.user }),
    schema,
    cache: "bounded",
    persistedQueries: false
  });
  await apolloServer.start();
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

function configureRateLimiter(app: Express) {
  if (env !== "production") return;

  const message = "Too many requests; please try again later";
  const data = { __typename: "ResponseErrorMessage", message };
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
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
