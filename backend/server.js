import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cors from "cors";
import Messages from "./dbModel.js";

const app = express();
const port = process.env.port || 8001;

dotenv.config();
const connectionUrl = process.env.CONNECTION_URL;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(Cors());

app.get("/", (req, res) => res.status(200).send("Hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.post("/messages/new", (req, res) => {
  const message = new Messages(req.body);
  message
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
