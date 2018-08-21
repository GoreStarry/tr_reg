var Tesseract = require("tesseract.js");
var fs = require("fs");
const path = require("path");

const img = fs.readFileSync(
  "./cypress/screenshots/TR/order.spec.js/Actions -- .png"
);

const options = {
  // lang: path.resolve(__dirname, "langs/eng.traineddata"),
  lang: "eng",
  tessedit_char_whitelist: "0123456789",
};

Tesseract.recognize(img, options).then(function(result) {
  console.log(result);
});
