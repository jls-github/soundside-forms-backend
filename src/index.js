const dotenv = require('dotenv')
const express = require('express')

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/forms", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
