var express = require("express");
var app = express();
const port = 2000;
// let AwsManager = require("./classes/awsmanager/AwsManager");



// Param: Bucket et name de l'image (get)
app.get("/", (req, res) => {
  let awsManager = new AwsManager(req.query.bucket, req.query.filename);

  // Responses are in json format
  res.setHeader("Content-Type", "application/json");

  res.send(JSON.stringify(awsManager.getRekognitionData()));

  // var bucket = req.query.bucket;
  //
  // if (bucket == null) {
  //   console.error("[WARNING]: bucket is empty");
  //   res
  //     .status(400)
  //     .send(
  //       JSON.stringify({ error: "Invalid request, bucket must be provided" })
  //     );
  // }
  //
  // var filename = req.query.filename;
  //
  // if (filename === null) {
  //   console.error("[WARNING]: fileName is empty");
  //   res
  //     .status(400)
  //     .send(
  //       JSON.stringify({ error: "Invalid request, fileName must be provided" })
  //     );
  // }

  // var params = {
  //   Image: {
  //     S3Object: {
  //       Bucket: bucket,
  //       Name: filename
  //     }
  //   },
  //   MaxLabels: 1,
  //   MinConfidence: 90
  // };
  // var rekognition = new AWS.Rekognition();
  // rekognition.detectLabels(params, function(err, data) {
  //   if (err) console.log(err, err.stack);
  //   // an error occurred
  //   else res.send(JSON.stringify(data));
  // }); // successful response
});

app.listen(port, () =>
  console.log(
    `App listening on port http://localhost:${port}/api/imagerecognition`
  )
);
