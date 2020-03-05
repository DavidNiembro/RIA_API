var AWS = require("aws-sdk");
var fs = require("fs");

class AwsLabelDetectorImpl {
    constructor() {
        AWS.config.loadFromPath("./config.json");
        this.rekognition = new AWS.Rekognition();
    }

    MakeAnalysisRequestLocal(imageFilePath, maxLabels, callback) {
        let image = fs.readFileSync(imageFilePath);
        this.ApiRequestLocal(image, maxLabels, callback);
    }

    MakeAnalysisRequest(bucketName, dataObjectName, maxLabels, callback) {
        this.ApiRequest(bucketName, dataObjectName, maxLabels, callback);
    }

    ApiRequestLocal(image, maxLabels, callback) {
        var params = {
            Image: {
                Bytes: image
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
        this.rekognition.detectLabels(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                // console.log(data);
                callback(JSON.stringify(data));
            }
        });
    }
}

module.exports = AwsLabelDetectorImpl;
