import Database from "better-sqlite3";

const db = new Database("bigger.db");

db.exec(
  `
  CREATE TABLE messages
  (
    username TEXT,
    content TEXT,
    reaction TEXT
  )`
);

const dummyData = [
  { username: "Spongebob", content: " Hello, world!", reaction: "😀" },
  {
    username: "Squarepants",
    content: " Please leave a message after the beep!",
    reaction: "😡",
  },
  { username: "Spongebob", content: "Beeeeep!", reaction: "😢" },
];

dummyData.forEach((message) => {
  db.prepare(
    "INSERT INTO messages (username, content, reaction) VALUES (?, ?, ?)"
  ).run(message.username, message.content, message.reaction);
});