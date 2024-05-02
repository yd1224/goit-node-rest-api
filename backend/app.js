import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
import { errorHandler } from "./controllers/errorController.js";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";
import { viewRouter } from "./routes/viewRouter.js";
import { Server } from "socket.io";

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

app.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'success',
    msg: 'pong!',
    test: null,
  });
});

app.use("/api/contacts", contactsRouter);

app.use("/users", usersRouter);

app.use("/", viewRouter);

app.set("view engine", "pug");
app.set("views", "views");

// app.use((_, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.all("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use(errorHandler);
/////////////////////////////////////
const port = process.env.PORT ? +process.env.PORT : 3000;

const server = app.listen(port, () => {
  console.log("Server is running. Use our API on port: 3000");
});

const io = new Server(server)

// io.on("connection", (socket) => {
//   console.log(">>>>>>>>>>>>>>>>>>>>>.");

//   socket.emit("message", { msg: "Hello from back" });

//   socket.on("custom", (data) => {
//     console.log({ data });
//   })

// })



////////////////////////////
// io.on("connection", (socket) => {
//   socket.on("message", (msg) => {
//     io.emit("message", msg)
//   })
// });



////////////////////////////
const nodeNameSpace = io.of("/nodeNameSpace")

nodeNameSpace.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room)

    const msg = `${data.nick ? " " : "New user "} joined ${data.room} room`

    nodeNameSpace.in(data.room).emit("message", { msg, nick: data.nick })
  })

  socket.on("message", (data) => {
    nodeNameSpace.in(data.room).emit("message", { msg: data.msg, nick: data.nick })
  })
})