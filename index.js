var AWS = require("aws-sdk");
var express = require("express");
var app = express();
const port = 2000;

app.get("/", function(req, res) {
  AWS.config.loadFromPath("./config.json");

  var params = {
    Image: {
      S3Object: {
        Bucket: "rekognition.actualit.info",
        Name: "Emirates-A380.jpg"
      }
    },
    MaxLabels: 1,
    MinConfidence: 90
  };
  var rekognition = new AWS.Rekognition();
  rekognition.detectLabels(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data);
  }); // successful response
  res.send("hello world !");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
