import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()
const app = express();
const db = new Database("bigger.db");
const PORT = 5174
app.use(cors());
app.use(express.json());

app.get("/messages", (req, res) => {
  // get the query string filter value from the request
  const filter = req.query.filter;
  let messages = [];
  if (!filter || filter === "all") {
    messages = db.prepare("SELECT * FROM messages").all();
  } else {
    messages = db
      .prepare("SELECT * FROM messages WHERE reaction = ?")
      .all(filter);
  }

  res.json(messages);
});

app.post("/messages", function (req, res) {
  db.prepare(
    "INSERT INTO messages (username, content, reaction) VALUES (?, ?, ?)"
  ).run(req.body.username, req.body.content, req.body.reaction);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});