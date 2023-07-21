const express = require("express");
const app = express();
const createBrowser = require("browserless");
const screenshot = require("./routes/screenshot");
const unshort = require("./routes/unshort");

if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(cors());
}

app.use(express.json());

const createBrowserInstance = async () => {
  const browser = createBrowser({
    lossyDeviceName: true,
  });
  console.log("Browserless factory created");
  app.set("browser", browser);
};
createBrowserInstance();

// routes
app.use("/api", unshort);
app.use("/api", screenshot);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
