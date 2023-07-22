const express = require("express");
const app = express();
const createBrowser = require("browserless");
const screenshot = require("./routes/screenshot");
const unshort = require("./routes/unshort");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());

const createBrowserInstance = async () => {
  const browser = createBrowser({
    lossyDeviceName: true,
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
  });
  console.log("Browserless factory created");
  app.set("browser", browser);
};
createBrowserInstance();

// routes
app.use("/api", unshort);
app.use("/api", screenshot);

app.listen(PORT, () => {
  console.log("Server started on", PORT);
});
