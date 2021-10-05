const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000; //step 1
const routesUrls = require("./routes/routes");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cors());
app.use("/api", routesUrls);

app.listen(PORT, () => console.log("server is up and running on port " + PORT));
