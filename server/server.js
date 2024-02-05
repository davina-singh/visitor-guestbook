import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();
const db = new Database("bigger.db");

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

app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});