var AWS = require("aws-sdk");
var fs = require("fs");

class AwsLabelDetectorImpl {
  constructor() {
    AWS.config.loadFromPath("./config.json");
    this.rekognition = new AWS.Rekognition();
  }

  MakeAnalysisRequest(imageURI, maxLabels, minConfidence, callback) {
    if (!fs.existsSync(imageURI)) {
      this.ApiRequest(
        "aws.rekognition.actualit.info",
        imageURI,
        maxLabels,
        minConfidence,
        callback
      );
    } else {
      this.ApiRequestLocal(
        fs.readFileSync(imageURI),
        maxLabels,
        minConfidence,
        callback
      );
    }
  }

  ApiRequestLocal(image, maxLabels, minConfidence, callback) {
    var params = {
      Image: {
        Bytes: image
      },
      MaxLabels: maxLabels,
      MinConfidence: minConfidence
    };
    this.rekognition.detectLabels(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        // console.log(data);
        callback(JSON.stringify(data));
      }
    });
  }
  ApiRequest(bucketName, dataObjectName, maxLabels, minConfidence, callback) {
    var params = {
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: dataObjectName
        }
      },
      MaxLabels: maxLabels,
      MinConfidence: minConfidence
    };
    this.rekognition.detectLabels(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        // console.log(data);
        callback(JSON.stringify(data));
      }
    });
  }
}

module.exports = AwsLabelDetectorImpl;
