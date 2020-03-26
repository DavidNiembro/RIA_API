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

  async IsObjectExists(objectUrl) {
    if (await this.IsBucketExists(this.bucketUrl)) {
      if (objectUrl != this.bucketUrl) {
        return await this.IsDataObjectExists(objectUrl);
      }
      return true;
    }
    return false;
  }

  async RemoveObject(objectUrl) {
    if (objectUrl == this.bucketUrl) {
      await this.DeleteBucket();
    } else {
      await this.DeleteObject(objectUrl.replace(this.bucketUrl + "/", ""));
    }
  }

  CreateBucket() {
    return this.client.createBucket({ Bucket: this.bucketUrl }).promise();
  }

  async DeleteBucket() {
    await this.EmptyBucket();
    return this.client.deleteBucket({ Bucket: this.bucketUrl }).promise();
  }

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

  DeleteObject(key) {
    return this.client
      .deleteObject({
        Bucket: this.bucketUrl,
        Key: key
      })
      .promise();
  }

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
