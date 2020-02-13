var AWS = require("aws-sdk");
var express = require("express");
var app = express();
const port = 2000;

// Param: Bucket et name de l'image (get)
app.get('/api/imagerecognition', (req, res) => {
  AWS.config.loadFromPath("./config.json");

  // Responses are in json format
  res.setHeader('Content-Type', 'application/json');

  var bucket = req.query.bucket;


  if (bucket == null)
  {
    console.error('[WARNING]: bucket is empty');
    res.status(400).send(JSON.stringify({"error" : 'Invalid request, bucket must be provided'}));
  }

  var filename = req.query.filename;


  if (filename === null)
  {
    console.error('[WARNING]: fileName is empty');
    res.status(400).send(JSON.stringify({"error" : 'Invalid request, fileName must be provided'}));
  }

  // http://localhost:2000/api/imagerecognition?bucket=rekognition.actualit.info&filename=Emirates-A380.jpg
  var params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name:  filename
      }
    },
    MaxLabels: 1,
    MinConfidence: 90
  };
  var rekognition = new AWS.Rekognition();
  rekognition.detectLabels(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.send(JSON.stringify(data));
  }); // successful response

});

app.listen(port, () => console.log(`App listening on port http://localhost:${port}/api/imagerecognition`))

