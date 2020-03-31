var AWS = require("aws-sdk");
var fs = require("fs");

class AwsLabelDetectorImpl {
  /**
   * Constructor that returns a new instance of rekognition class
   * @param bucketUrl
   */
  constructor() {
    AWS.config.loadFromPath("./config.json");
    this.rekognition = new AWS.Rekognition();
  }

  /**
   * Public method to make an analysis
   * @param imageURI
   * @param maxLabels
   * @param minConfidence
   * @param callback
   * @returns void
   */
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

  /**
   * Private method to make an analysis with local data
   * @param image
   * @param maxLabels
   * @param minConfidence
   * @param callback
   * @returns void
   */
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
        callback(JSON.stringify(data));
      }
    });
  }

  /**
   * Private method to make an analysis with data in a bucket
   * @param bucketName
   * @param dataObjectName
   * @param maxLabels
   * @param minConfidence
   * @param callback
   * @returns json
   */
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
        callback(JSON.stringify(data));
      }
    });
  }
}

module.exports = AwsLabelDetectorImpl;
