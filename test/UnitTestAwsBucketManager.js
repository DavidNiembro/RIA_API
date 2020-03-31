var assert = require("chai").assert;
var fs = require("fs");
var AwsBucketManagerImpl = require("../src/models/AwsBucketManagerImpl");

let bucketName = null;
let domain = null;
let bucketUrl = null;
let imageName = null;
let pathToTestFolder = null;
let prefixObjectDownloaded = null;
let bucketManager = null;

/**
 * This test file is designed to confirm the AwsBucketManager class's behavior
 */
describe("UnitTestAwsBucketManager", function() {
  this.timeout(0);

  /**
   * This test method initializes the context before each test method run.
   */
  beforeEach(function() {
    pathToTestFolder = "./test";
    bucketName = "tests.ria";
    domain = "actualit.info";
    bucketUrl = bucketName + "." + domain;
    imageName = "emiratesa380.jpg";
    prefixObjectDownloaded = "downloaded";
    bucketManager = new AwsBucketManagerImpl(bucketUrl);
  });

  /**
   * This test method checks the method in charge of creating a new object
   * We try to create a new bucket
   */
  it("CreateObject_CreateNewBucket_Success", async function() {
    //given
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));

    //when
    await bucketManager.CreateObject(bucketUrl);

    //then
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
  });

  /**
   * This test method checks the method in charge of creating a new data object
   * Note : the bucket exists
   */
  it("CreateObject_CreateObjectWithExistingBucket_Success", async function() {
    //given
    let fileName = imageName;
    let objectUrl = bucketUrl + "/" + imageName;
    await bucketManager.CreateObject(bucketUrl);
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
    assert.isFalse(await bucketManager.IsObjectExists(objectUrl));

    //when
    await bucketManager.CreateObject(
      objectUrl,
      pathToTestFolder + "/" + fileName
    );

    //then
    assert.isTrue(await bucketManager.IsObjectExists(objectUrl));
  });

  /**
   * This test method checks the method in charge of creating a new data object
   * Note : the bucket doesn't exist
   */
  it("CreateObject_CreateObjectBucketNotExist_Success", async function() {
    //given
    let fileName = imageName;
    let objectUrl = bucketUrl + "/" + imageName;
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));
    assert.isFalse(await bucketManager.IsObjectExists(objectUrl));

    //when
    await bucketManager.CreateObject(
      objectUrl,
      pathToTestFolder + "/" + fileName
    );

    //then
    assert.isTrue(await bucketManager.IsObjectExists(objectUrl));
  });

  /**
   * This test method checks the method in charge of uploading item in an existing bucket
   */
  it("DownloadObject_NominalCase_Success", async function() {
    //given
    let objectUrl = bucketUrl + "/" + imageName;
    let destinationFullPath =
      pathToTestFolder + "/" + prefixObjectDownloaded + imageName;
    await bucketManager.CreateObject(
      objectUrl,
      pathToTestFolder + "/" + imageName
    );
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));

    //when
    await bucketManager.DownloadObject(objectUrl, destinationFullPath);

    //then
    assert.isTrue(fs.existsSync(destinationFullPath));
  });

  /**
   * This test method checks the method in charge of testing the existence of an object
   */
  it("IsObjectExists_NominalCase_Success", async function() {
    //given
    await bucketManager.CreateObject(bucketUrl);
    //when

    let actualResult = await bucketManager.IsObjectExists(bucketUrl);

    //then
    assert.isTrue(actualResult);
  });

  /**
   * This test method checks the method in charge of testing the existence of an object
   * When the object doesn't exist (object is the bucket)
   */
  it("IsObjectExists_ObjectNotExistBucket_Success", async function() {
    //given
    let notExistingBucket = "notExistingBucket" + "." + domain;
    //when
    let actualResult = await bucketManager.IsObjectExists(notExistingBucket);
    //then
    assert.isFalse(actualResult);
  });

  /**
   * This test method checks the method in charge of testing the existence of an object
   * When the object doesn't exist (object is the file in an existing bucket)
   */
  it("IsObjectExists_ObjectNotExistFile_Success", async function() {
    //given
    await bucketManager.CreateObject(bucketUrl);
    let notExistingFile = bucketUrl + "//" + "notExistingFile.jpg";
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));

    //when
    let actualResult = await bucketManager.IsObjectExists(notExistingFile);

    //then
    assert.isFalse(actualResult);
  });

  /**
   *
   */
  it("RemoveObject_EmptyBucket_Success", async function() {
    //given
    await bucketManager.CreateObject(bucketUrl);
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
    //when
    await bucketManager.RemoveObject(bucketUrl);
    //then
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));
  });

  /**
   *
   */
  it("RemoveObject_NotEmptyBucket_Success", async function() {
    //given
    let fileName = imageName;
    let objectUrl = bucketUrl + "/" + imageName;
    await bucketManager.CreateObject(bucketUrl);
    await bucketManager.CreateObject(
      objectUrl,
      pathToTestFolder + "/" + fileName
    );
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
    assert.isTrue(await bucketManager.IsObjectExists(objectUrl));
    //when
    await bucketManager.RemoveObject(bucketUrl);
    //then
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));
  });

  /**
   * This test method cleans up the context after each test method run.
   */
  afterEach(async function() {
    let destinationFullPath =
      pathToTestFolder + "/" + prefixObjectDownloaded + imageName;

    if (fs.existsSync(destinationFullPath)) {
      fs.unlinkSync(destinationFullPath);
    }

    if (await bucketManager.IsObjectExists(bucketUrl)) {
      await bucketManager.RemoveObject(bucketUrl);
    }
  });
});
