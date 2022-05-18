require("dotenv").config();

const utils = require("../src/utils.js");

utils.execute("mc#123abc").then((result) => {
  if (result.success) {
    console.log(result.message);
  } else {
    console.error(result.message);
  }
});
