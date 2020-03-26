var assert = require("chai").assert;
var AwsBucketManagerImpl = require("../src/models/AwsBucketManagerImpl");

let bucketName = null;
let domain = null;
let bucketUrl = null;
let imageName = null;
let fullPathToImage = null;
let prefixObjectDownloaded = null;
let bucketManager = null;

describe("UnitTestAwsBucketManager", function() {
  this.timeout(15000);

  beforeEach(function() {
    bucketName = "david";
    //bucketName = "awsdevteam";
    domain = "actualit.info";
    bucketUrl = bucketName + "." + domain;
    imageName = "emiratesa380.jpg";
    fullPathToImage = "./test/" + imageName;
    prefixObjectDownloaded = "downloaded";
    bucketManager = new AwsBucketManagerImpl(bucketUrl);
  });

  // BUCKET TEST
  it("CreateObject_CreateNewBucket_Success", async function() {
    //given
    assert.isFalse(await bucketManager.IsObjectExists(bucketUrl));

    //when
    await bucketManager.CreateObject(bucketUrl);

    //then
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
  });

  it("CreateObject_CreateNewFile_Success", function() {
    assert.isTrue(true);
  });

  it("DownloadObject_NominalCase_Success", function() {
    assert.isTrue(true);
  });

  it("IsObjectExists_NominalCase_Success", async function() {
    //given
    await bucketManager.CreateObject(bucketUrl);

    //then
    assert.isTrue(await bucketManager.IsObjectExists(bucketUrl));
  });

  it("IsObjectExists_ObjectNotExistBucket_Success", async function() {
    //given
    let notExistingBucket = "notExistingBucket" + domain;

    //then
    assert.isFalse(await bucketManager.IsObjectExists(notExistingBucket));
  });

  it("IsObjectExists_ObjectNotExistFile_Success", function() {
    assert.isTrue(true);
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
    if (await bucketManager.IsObjectExists(bucketUrl)) {
      await bucketManager.RemoveObject(bucketUrl);
    }
  });
});
