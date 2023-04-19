import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";
import morgan from "morgan";

import users from "./api/routes/users.routes.js";
import projects from "./api/routes/projects.routes.js";
import categories from "./api/routes/categories.routes.js";
import donations from "./api/routes/donations.routes.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
    ],
  })
);
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "¡Bienvenido al servidor!" });
});

app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/categories", categories);
app.use("/api/donations", donations);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
