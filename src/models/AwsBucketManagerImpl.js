var AWS = require("aws-sdk");
var fs = require("fs");

class AwsBucketManagerImpl {
  /**
   * Constructor that returns a new instance of BucketManagerImpl class
   * @param bucketUrl
   */
  constructor(bucketUrl) {
    // AWS.config.loadFromPath("./config.json");
    this.bucketUrl = bucketUrl; // "aws.rekognition.actualit.info";

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
  async CreateObject(objectUrl, filePath = "") {
    return new Promise(resolve => {
      this.CreateBucket(resolve);
    });
  }

  /**
   * Method that checks if objectUrl is pointing to something valid (existing)
   * @param objectUrl
   * @constructor
   */

  async IsObjectExists(objectUrl) {
    return new Promise(resolve => {
      this.IsBucketExists(objectUrl, resolve);
    });
  }

  /**
   * Remove the bucket or a file in the bucket
   * @param objectUrl
   * @constructor
   */
  async RemoveObject(objectUrl) {
    //if (objectUrl == this.bucketUrl) {
    return new Promise(resolve => {
      this.DeleteBucket(resolve);
    });
    //} else {
    //}
  }

  /**
   * Method that download the data object
   * @param objectUrl
   * @param destinationUrl
   * @param update
   * @constructor
   */
  DownloadObject(objectUrl, destinationUrl, update = false) {}

  /**
   *
   * Private methods
   *
   */

  /**
   * This method checks if the current bucket exists
   * @constructor
   */

  async IsBucketExists(bucketUrl, resolve) {
    try {
      await this.client.headBucket({ Bucket: bucketUrl }, function(err, data) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      resolve(false);
    }
  }

  async CreateBucket(resolve) {
    try {
      await this.client.createBucket({ Bucket: this.bucketUrl }, function(
        err,
        data
      ) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (e) {
      resolve(false);
    }
  }

  async DeleteBucket(resolve) {
    //await this.EmptyBucket();
    try {
      await this.client.deleteBucket({ Bucket: this.bucketUrl }, function(
        err,
        data
      ) {
        if (err) resolve(false);
        else resolve(true);
      });
    } catch {
      resolve(false);
    }
  }

  async EmptyBucket() {
    await this.client.listObjects(
      {
        Bucket: this.bucketUrl
      },
      function(err, data) {
        if (err) console.log(err, err.stack);
        else {
          if (data.Contents.length > 0) {
            //TODO: map the content and use the delete function
            // foreach(s3Object in objectListing.S3Objects);
            // {
            //   //await DeleteObject(s3Object.Key);
            // }
          }
        }
      }
    );
  }
}

module.exports = AwsBucketManagerImpl;
