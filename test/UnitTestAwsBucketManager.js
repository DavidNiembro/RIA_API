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

describe("UnitTestAwsBucketManager", function() {
  this.timeout(0);
  beforeEach(function() {
    pathToTestFolder = "./test";
    bucketName = "tests.ria";
    domain = "actualit.info";
    bucketUrl = bucketName + "." + domain;
    imageName = "emiratesa380.jpg";
    prefixObjectDownloaded = "downloaded";
    bucketManager = new AwsBucketManagerImpl(bucketUrl);
  });
  it("CreateObject_CreateNewBucket_Success", async function() {
    //given
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));

    //when
    await bucketManager.CreateObject(bucketUrl);

    //then
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
  });
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
  it("IsObjectExists_NominalCase_Success", async function() {
    //given
    await bucketManager.CreateObject(bucketUrl);
    //when

    let actualResult = await bucketManager.IsObjectExists(bucketUrl);

    //then
    assert.isTrue(actualResult);
  });
  it("IsObjectExists_ObjectNotExistBucket_Success", async function() {
    //given
    let notExistingBucket = "notExistingBucket" + "." + domain;
    //when
    let actualResult = await bucketManager.IsObjectExists(notExistingBucket);
    //then
    assert.isFalse(actualResult);
  });
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
  it("RemoveObject_NominalCase_Success", async function() {
    //given
    await bucketManager.CreateObject(bucketUrl);
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
    //when
    await bucketManager.RemoveObject(bucketUrl);
    //then
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));
  });

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
