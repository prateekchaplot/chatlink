import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import Cors from "cors";
import Messages from "./dbModel.js";
import Pusher from "pusher";

const app = express();
const port = process.env.port || 8001;

dotenv.config();
const connectionUrl = process.env.CONNECTION_URL;
const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(Cors());

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagingmessages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType == "insert") {
      const msgDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: msgDetails.name,
        message: msgDetails.message,
        timestamp: msgDetails.timestamp,
        received: msgDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

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
