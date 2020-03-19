var AWS = require("aws-sdk");
var fs = require("fs");

class AwsBucketManagerImpl {
  /**
   * Constructor that returns a new instance of BucketManagerImpl class
   * @param bucketUrl
   */
  constructor(bucketUrl) {
    // AWS.config.loadFromPath("./config.json");
    this.bucketUrl = "awsdevteam.actualit.info"; // "aws.rekognition.actualit.info";

    // Create the instance as in the doc (don't know  yet why apiVersion is set here):
    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
    this.client = new AWS.S3({ apiVersion: "2006-03-01" });
  }

  /**
   *
   * Public methods
   *
   */

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
  async IsObjectExists(objectUrl) {
    let answer = false;
    let response = await this.IsBucketExists(this.bucketUrl);
    if (response) {
      answer = true;
    }
    return answer;
  }

  /**
   * Remove the bucket or a file in the bucket
   * @param objectUrl
   * @constructor
   */
  RemoveObject(objectUrl) {}

  /**
   *
   * Private methods
   *
   */

  /**
   * This method checks if the current bucket exists
   * @constructor
   */
  async IsBucketExists(bucketUrl) {
    let promise = new Promise((resolve, reject) => {
      this.client.listBuckets((err, data) => {
        if (err) {
          reject(false);
        } else {
          resolve(
            data.Buckets.some(
              bucket => bucket.Name === "awsdevteam.actualit.info"
            )
          );
        }
      });
    }).catch(error => {
      console.error(error, "Promise error");
      done();
    });
    return await promise;
  }
}

module.exports = AwsBucketManagerImpl;
