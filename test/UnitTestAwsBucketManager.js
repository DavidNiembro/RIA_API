var assert = require("assert");
var AwsBucketManagerImpl = require("../src/models/AwsBucketManagerImpl");

let bucketName = null;
let domain = null;
let bucketUrl = null;
let imageName = null;
let fullPathToImage = null;
let prefixObjectDownloaded = null;
let bucketManager = null;

describe("UnitTestAwsBucketManager", function() {
  beforeEach(function() {
    bucketName = "testbucket";
    //bucketName = "awsdevteam";
    domain = "actualit.info";
    bucketUrl = bucketName + "." + domain;
    imageName = "emiratesa380.jpg";
    fullPathToImage = "./test/" + imageName;
    prefixObjectDownloaded = "downloaded";
    bucketManager = new AwsBucketManagerImpl(bucketUrl);
  });

  // BUCKET TEST

  it("CreateObject_CreateNewBucket_Success", function(done) {
    assert.equal(true, false);
    done();
  });
  it("CreateObject_CreateNewFile_Success", function(done) {
    assert.equal(true, false);
    done();
  });
  it("DownloadObject_NominalCase_Success", function(done) {
    assert.equal(true, false);
    done();
  });
  it("IsObjectExists_NominalCase_Success", function(done) {
    //given
    let bucketName = "testBucket";
    let bucketUrl = bucketName + "/" + domain;
    bucketManager.CreateObject(bucketUrl);

    //when
    let actualResult = bucketManager.IsObjectExists(bucketUrl);
    actualResult.then(result => {
      assert.equal(result, true);
      done();
    });
    //then
  });
  it("IsObjectExists_ObjectNotExistBucket_Success", function(done) {
    //given
    let notExistingBucket = "notExistingBucket" + domain;

    //when
    let actualResult = bucketManager.IsObjectExists(notExistingBucket);

    //then
    assert.equal(actualResult, false);
    done();
  });
  it("IsObjectExists_ObjectNotExistFile_Success", function(done) {
    assert.equal(true, false);
    done();
  });
  it("RemoveObject_NominalCase_Success", async function(done) {
    //given
    //await bucketManager.CreateObject(this.bucketUrl);
    //Assert.IsTrue(this.bucketManager.IsObjectExists(bucketUrl));

    //when
    await bucketManager.RemoveObject(bucketUrl);

    //then
    //Assert.IsFalse(this.bucketManager.IsObjectExists(bucketUrl));
    assert.equal(true, false);
    done();
  });
  afterEach(function() {});
});
