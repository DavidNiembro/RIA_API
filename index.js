var AWS = require("aws-sdk");
var express = require("express");
var app = express();
const port = 2000;

/**
 * Get on the route /api/imagerecognition
 * @param {Object} req Information on the request
 * @param {Object} res Information on the response for the request
 * @returns {json}
 */

// Param: Bucket et name de l'image (get)
app.get('/api/imagerecognition', (req, res) => {
  /** Credentials for amazon */
  AWS.config.loadFromPath("./config.json");

  /** 
   * Responses are in json format
   */
  res.setHeader('Content-Type', 'application/json');

  /**
   * Recup the bucket in S3
   */
  var bucket = req.query.bucket;

  if (bucket == null)
  {
    console.error('[WARNING]: bucket is empty');
    res.status(400).send(JSON.stringify({"error" : 'Invalid request, bucket must be provided'}));
  }

  /**
   * Recup the file in the request
   */
  var filename = req.query.filename;

  if (filename === null)
  {
    console.error('[WARNING]: fileName is empty');
    res.status(400).send(JSON.stringify({"error" : 'Invalid request, fileName must be provided'}));
  }

  // http://localhost:2000/api/imagerecognition?bucket=rekognition.actualit.info&filename=Emirates-A380.jpg
  /**
   * Params for the request to Rekognition service from Amazon 
   * @param {string} Bucket - Get the name of the bucket
   * @param {string} Name - Get the name of the image
   * @param {int} MaxLabels - Show only one metadata in the response 
   * @param {int} MinConfidence - Show only rows who's higher than a pourcentage 
   */
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