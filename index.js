/**
 * @file Recognition in a image with Amazon
 * @author Dardan Iljazi, David Niembro and Jérémy Gfeller
 */

var express = require("express");
var AwsLabelDetectorImpl = require("./src/models/AwsLabelDetectorImpl");

var app = express();
const port = 2000;

/**
 * Get on the route /api/imagerecognition
 * @param {Object} req - Information on the request
 * @param {Object} res - Information on the response for the request
 * @returns {json}
 */

app.get("/api/imagerecognition", (req, res) => {
  let awsDetector = new AwsLabelDetectorImpl();
  res.setHeader("Content-Type", "application/json");

  /**
   * Recup the bucket in S3
   * @returns {string}
   */
  var bucket = req.query.bucket;

  if (bucket == null) {
    console.error("[WARNING]: bucket is empty");
    res
      .status(400)
      .send(
        JSON.stringify({ error: "Invalid request, bucket must be provided" })
      );
  }

  /**
   * Recup the file in the request
   * @returns {string}
   */
  var filename = req.query.filename;

  if (filename === null) {
    console.error("[WARNING]: fileName is empty");
    res
      .status(400)
      .send(
        JSON.stringify({ error: "Invalid request, fileName must be provided" })
      );
  }
  let filepath = "./test/emiratesa380.jpg";
  awsDetector.MakeAnalysisRequestLocal(filepath, 1, function(data) {
    console.log(data);
  });

  awsDetector.MakeAnalysisRequest(bucket, filename, 1, function(data) {
    res.send(data);
  });
});

app.listen(port, () =>
  console.log(
    `App listening on port http://localhost:${port}/api/imagerecognition`
  )
);
