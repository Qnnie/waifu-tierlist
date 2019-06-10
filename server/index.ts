import next from "next";
import express from "express";
import { init } from "./startup";
import router from "./api/routes";
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(process.env.WAIFU_TIERLIST_URL);

const server = express();
server.use(router);
server.get("*", (req, res) => handle(req, res));

app
  .prepare()
  .then(init)
  .then(() => {
    // tslint:disable-next-line:no-console
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });

server.listen(port);