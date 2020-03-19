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
  async RemoveObject(objectUrl) {
    //if (objectUrl == this.bucketUrl) {
    await this.DeleteBucket();
    //} else {
    //}
  }

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

  async DeleteBucket() {
    await this.EmptyBucket();
    await this.client.deleteBucket({ Bucket: this.bucketUrl }, function(
      err,
      data
    ) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });
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
