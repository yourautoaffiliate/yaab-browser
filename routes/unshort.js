const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const UserAgent = require("user-agents");

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

router.get("/unshort", async (req, res) => {
  let { url } = req.query;
  if (!isValidUrl(url)) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid URL" });
    return;
  }

  // check if url is found already unshorted within url
  url = decodeURIComponent(url);
  const secondIndex = url.indexOf("https://", url.indexOf("https://") + 1);
  if (secondIndex !== -1) {
    const unshorted_url = url.substring(secondIndex);
    return res.json({ url: unshorted_url });
  }

  const browser = req.browser;

  let browserless;
  try {
    browserless = await browser.createContext();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create browser context" });
    return;
  }

  const page = await browserless.page();
  await page.goto(url, {
    headers: { "User-Agent": new UserAgent().toString() },
  });
  let finalURL = await page.url();

  res.status(StatusCodes.OK).json({ url: finalURL });
  return await browserless.destroyContext();
});

module.exports = router;
