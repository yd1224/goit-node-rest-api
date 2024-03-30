import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import { createContact } from "./controllers/contactsControllers.js";
import { getAllContacts } from "./controllers/contactsControllers.js";
import { getOneContact } from "./controllers/contactsControllers.js";
import { updateContact } from "./controllers/contactsControllers.js";
import { deleteContact } from "./controllers/contactsControllers.js";

const app = express();

// app.use(morgan("tiny"));
// app.use(cors());
app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((_, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });
//////////////////////////////////////
app.post("/api/contacts", (req, res) => {
  createContact(req, res);
});

app.get("/api/contacts", (req, res) => {
  getAllContacts(req, res);
});

app.get("/api/contacts/:id", (req, res) => {
  getOneContact(req, res);
});

app.put("/api/contacts/:id", (req, res) => {
  updateContact(req, res);
});

app.delete("/api/contacts/:id", (req, res) => {
  deleteContact(req, res);
});
/////////////////////////////////////
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
