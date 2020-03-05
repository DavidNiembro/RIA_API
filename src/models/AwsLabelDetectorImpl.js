var AWS = require("aws-sdk");

class AwsLabelDetectorImpl {
  constructor() {
    AWS.config.loadFromPath("./config.json");
    this.rekognition = new AWS.Rekognition();
  }

  MakeAnalysisRequest(bucketName, dataObjectName, maxLabels, callback) {
    this.ApiRequest(bucketName, dataObjectName, maxLabels, callback);
  }

  ApiRequest(bucketName, dataObjectName, maxLabels, callback) {
    var params = {
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: dataObjectName
        }
      },
      MaxLabels: maxLabels
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
