const express = require("express");
const path = require("path");
const data = require("./mock-data.json");
const app = express();
const port = 8080;
const connection = require("./config/connection.js");
const router = require("./routes");
// app.use("/", express.static(path.join(__dirname, "static")));
app.set("json spaces", 2);
app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
