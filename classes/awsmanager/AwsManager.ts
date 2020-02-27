let ErrorManager = require('./classes/errors/ErrorsManager');
let AWS = require("aws-sdk");


class AwsManager {
    private bucket: string;
    private filename: string;

    private rekognition : AWS.Rekognition;
    // Will contain the parameters to pass to rekognition
    private awsRekognitionAwsParams: object;

    constructor(bucketName: string, fileName: string) {
        bucketName == null ? ErrorManager.log('[WARNING]: bucketName is null');
        fileName == null ? ErrorManager.log('[WARNING]: fileName is null');

        this.bucket = bucketName;
        this.filename = fileName;

        this.loadConfigFile();
        this.setParameters(this.bucket, this.filename);

        this.rekognition = new AWS.Rekognition();
    }

    public getRekognitionData() : string {
        this.rekognition.detectLabels(params, function(err, data) {
            if (err) {
                ErrorManager.log(err, err.stack);
            }

            return data;
        });
    }

    private loadConfigFile() : void {
        AWS.config.loadFromPath("./config.json");
    }

    private setParameters(bucket: string, filename: string) {
        this.awsRekognitionAwsParams = {
            Image: {
                S3Object: {
                    Bucket: bucket,
                    Name: filename
                }
            },
            MaxLabels: 1,
            MinConfidence: 90
        };
    }
}
