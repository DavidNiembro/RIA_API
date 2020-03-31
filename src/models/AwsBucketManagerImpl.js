var AWS = require("aws-sdk");
var fs = require("fs");

class AwsBucketManagerImpl {
  /**
   * Constructor that returns a new instance of BucketManagerImpl class
   * @param bucketUrl
   */
  constructor(bucketUrl) {
    this.bucketUrl = bucketUrl;
    this.client = new AWS.S3({ apiVersion: "2006-03-01" });
  }

  /**
   * Public method to create an object
   * @param objectUrl
   * @param filePath
   * @returns void
   */
  async CreateObject(objectUrl, filePath = "") {
    if (!(await this.IsBucketExists(this.bucketUrl))) {
      await this.CreateBucket();
    }
    if (objectUrl != this.bucketUrl) {
      await this.WriteObject(
        this.bucketUrl,
        objectUrl.replace(this.bucketUrl + "/", ""),
        filePath
      );
    }
  }

  /**
   * Public method to download file on S3
   * @param objectUrl
   * @param destinationUri
   * @returns Promise
   */
  async DownloadObject(objectUrl, destinationUri) {
    return this.client
      .getObject({
        Bucket: this.bucketUrl,
        Key: objectUrl.replace(this.bucketUrl + "/", "")
      })
      .promise()
      .then(function(data) {
        fs.writeFileSync(destinationUri, data.Body.toString());
      });
  }

  /**
   * Public method to check if the object exist on S3
   * @param objectUrl
   * @returns bool
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
   * @param objectUrl
   * @returns void
   */
  async RemoveObject(objectUrl) {
    if (objectUrl == this.bucketUrl) {
      await this.DeleteBucket();
    } else {
      await this.DeleteObject(objectUrl.replace(this.bucketUrl + "/", ""));
    }
  }

  /**
   * Private method to create an object
   * @returns Promise
   */
  CreateBucket() {
    return this.client.createBucket({ Bucket: this.bucketUrl }).promise();
  }

  /**
   * Private method to delete an object
   * @returns Promise
   */
  async DeleteBucket() {
    await this.EmptyBucket();
    return this.client.deleteBucket({ Bucket: this.bucketUrl }).promise();
  }

  /**
   * Private method to delete an object in a Bucket S3
   * @returns Promise
   */
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

  /**
   * Private method to delete a Bucket S3
   * @param key
   * @returns Promise
   */
  DeleteObject(key) {
    return this.client
      .deleteObject({
        Bucket: this.bucketUrl,
        Key: key
      })
      .promise();
  }

  /**
   * Private method to upload an object in a Bucket S3
   * @param bucketName
   * @param keyName
   * @param filePath
   * @returns Promise
   */
  WriteObject(bucketName, keyName, filePath) {
    let fileBuffer = fs.readFileSync(filePath);
    return this.client
      .upload({
        Bucket: bucketName,
        Key: keyName,
        Body: fileBuffer
      })
      .promise();
  }

  /**
   * Private method to check if a bucket exist in S3
   * @param bucketUrl
   * @returns Bool
   */
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

  /**
   * Private method to check if a file exist in a bucket s3
   * @param objectUrl
   * @returns Bool
   */
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
