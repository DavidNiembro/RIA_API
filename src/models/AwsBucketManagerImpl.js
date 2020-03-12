var AWS = require("aws-sdk");
var fs = require("fs");

class AwsBucketManagerImpl {
  /**
   * Constructor that returns a new instance of BucketManagerImpl class
   * @param bucketUrl
   */
  constructor(bucketUrl) {
    // AWS.config.loadFromPath("./config.json");
    // this.bucketUrl = bucketUrl; // "aws.rekognition.actualit.info";
    //
    // // Create the instance as in the doc (don't know  yet why apiVersion is set here):
    // // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
    // this.client = new AWS.S3({apiVersion: '2006-03-01'});
  }

  /**
   * Method that creates the bucket
   * @param objectUrl
   * @param filePath
   * @constructor
   */
  CreateObject(objectUrl, filePath = "") {}

  /**
   * Method that download the data object
   * @param objectUrl
   * @param destinationUrl
   * @param update
   * @constructor
   */
  DownloadObject(objectUrl, destinationUrl, update = false) {}

  /**
   * Method that checks if objectUrl is pointing to something valid (existing)
   * @param objectUrl
   * @constructor
   */
  IsObjectExists(objectUrl) {}

  /**
   * Remove the bucket or a file in the bucket
   * @param objectUrl
   * @constructor
   */
  RemoveObject(objectUrl) {}
}

module.exports = AwsBucketManagerImpl;
