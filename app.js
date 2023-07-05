const express = require("express");
const app = express();
const port = 8000;
const router = require("./routes");

app.set("json spaces", 2);
app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
