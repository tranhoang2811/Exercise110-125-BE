import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import router from "./routes";
import { PORT } from "./config";

// *INFO: Exercise 110-112
const app: Express = express();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(morgan("combined"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/", (request: Request, response: Response, next: NextFunction) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.type("application/json");
  next();
});
