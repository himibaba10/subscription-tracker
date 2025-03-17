import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { PORT } from "./config/config.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import connectToDB from "./database/index.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import { arcjetMiddleware } from "./middlewares/arcjet.js";
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// Routes
routes(app);

app.get("/", (req, res) => {
  res.send("Welcome to subscription trakcer API!");
});

app.use("*", notFoundHandler);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);
  await connectToDB();
});
