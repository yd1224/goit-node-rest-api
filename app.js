import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
import { errorHandler } from "./controllers/errorController.js";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("tiny"));
}

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);

app.use("/users", usersRouter);

// app.use((_, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.all("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use(errorHandler);
/////////////////////////////////////
const port = process.env.PORT ? +process.env.PORT : 3000;
app.listen(port, () => {
  console.log("Server is running. Use our API on port: 3000");
});
