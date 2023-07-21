const express = require("express");
const router = express.Router();
const validator = require("validator");

router.get("/capture", async (req, res) => {
  let { url, device } = req.query;
  if (!url) {
    res.status(400).json({ error: "Missing url" });
    return;
  }
  if (!validator.isURL(url)) {
    res.status(400).json({ error: "Invalid url" });
    return;
  }
  if (device) {
    device = device === "mobile" ? "iPhone X" : "Macbook Pro 13";
  } else {
    device = "Macbook Pro 13";
  }

  const browser = req.browser;

  let browserless;
  try {
    browserless = await browser.createContext();

    const buffer = await browserless.screenshot(url, {
      device: device,
    });

    res.status(200).json({ image: buffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (browserless) {
      await browserless.destroyContext();
    }
  }
});

module.exports = router;
