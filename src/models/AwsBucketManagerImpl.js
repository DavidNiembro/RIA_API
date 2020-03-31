var AWS = require("aws-sdk");
var fs = require("fs");

/**
 * This class is designed to manage an AWS S3 object
 */
class AwsBucketManagerImpl {
  /**
   * Constructor that returns a new instance of BucketManagerImpl class
   * @param {String} bucketUrl
   */
  constructor(bucketUrl) {
    this.bucketUrl = bucketUrl;
    this.client = new AWS.S3({ apiVersion: "2006-03-01" });
  }

  /**
   * Public method to create an object
   * @param {String} objectUrl Url for the object
   * @param {String} filePath
   * @returns {undefined} nothing
   */
  async CreateObject(objectUrl, filePath = "") {
    // Does the bucket exists 
    if (!(await this.IsBucketExists(this.bucketUrl))) {
      await this.CreateBucket();
    }

    // Does the objectUrl is a bucket
    if (objectUrl != this.bucketUrl) {
      await this.WriteObject(
        this.bucketUrl,
        objectUrl.replace(this.bucketUrl + "/", ""),
        filePath
      );
    }
  }

  /**
   * Public method to download a file on S3
   * @param {String} objectUrl Url for the object
   * @param {String} destinationUri
   * @returns {Promise} Promise
   */
  async DownloadObject(objectUrl, destinationUri) {
    return this.client
      .getObject({
        Bucket: this.bucketUrl,
        Key: objectUrl.replace(this.bucketUrl + "/", "")
      })
      .promise()
      .then(function(data) {
        // Create a local file with data
        fs.writeFileSync(destinationUri, data.Body.toString());
      });
  }

  /**
   * Public method to check if the object exist on S3
   * @param {String} objectUrl Url for the object
   * @returns {Bool} bool
   */
  async IsObjectExists(objectUrl) {
    if (await this.IsBucketExists(this.bucketUrl)) {
      if (objectUrl != this.bucketUrl) {
        return await this.IsDataObjectExists(objectUrl);
      } //objectUrl != this.bucketUrl
      return true;
    } //await this.IsBucketExists(this.bucketUrl)
    return false;
  }

  /**
   * Public method to remove an object
   * @param {String} objectUrl Url for the object
   * @returns {undefined} nothing
   */
  async RemoveObject(objectUrl) {
    if (objectUrl == this.bucketUrl) {
      await this.DeleteBucket();
    } else {
      await this.DeleteObject(objectUrl.replace(this.bucketUrl + "/", ""));
    }
  }

  // Private method to create an object
  CreateBucket() {
    return this.client.createBucket({ Bucket: this.bucketUrl }).promise();
  }

  // Private method to delete an object
  async DeleteBucket() {
    await this.EmptyBucket();
    return this.client.deleteBucket({ Bucket: this.bucketUrl }).promise();
  }

  // Private method to delete an object in a Bucket S3
  EmptyBucket() {
    return this.client
      .listObjects({ Bucket: this.bucketUrl })
      .promise()
      .then(
        function(data) {
          data.Contents.forEach(async s3Object => {
            await this.DeleteObject(s3Object.Key);
          });
        }.bind(this)
      );
  }

  // Private method to delete a Bucket S3
  DeleteObject(key) {
    return this.client
      .deleteObject({
        Bucket: this.bucketUrl,
        Key: key
      })
      .promise();
  }

  // Private method to upload an object in a Bucket S3
  WriteObject(bucketName, keyName, filePath) {
    // Retrieve data from file 
    let fileBuffer = fs.readFileSync(filePath);
    return this.client
      .upload({
        Bucket: bucketName,
        Key: keyName,
        Body: fileBuffer
      })
      .promise();
  }

  // Private method to check if a bucket exist in S3
  IsBucketExists(bucketUrl) {
    return this.client
      .headBucket({ Bucket: bucketUrl })
      .promise()
      .then(
        function(data) {
          return true;
        },
        function(error) {
          return false;
        }
      );
  }

  // Private method to check if a file exist in a bucket s3
  IsDataObjectExists(objectUrl) {
    return this.client
      .headObject({
        Bucket: this.bucketUrl,
        Key: objectUrl.replace(this.bucketUrl + "/", "")
      })
      .promise()
      .then(
        function(data) {
          return true;
        },
        function(error) {
          return false;
        }
      );
  }
}

module.exports = AwsBucketManagerImpl;
