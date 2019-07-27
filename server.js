const express = require("express");
const path = require('path');

app = express();

app.use(express.static(__dirname + "/dist"));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);
