const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
};
