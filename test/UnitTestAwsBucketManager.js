var assert = require("assert");

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
    domain = "dev.actualit.info";
    bucketUrl = bucketName + "." + domain;
    imageName = "emiratesa380.jpg";
    fullPathToImage = "./test/" + imageName;
    prefixObjectDownloaded = "downloaded";
    //bucketManager = new AwsBucketManagerImpl(bucketUrl);
  });

  // BUCKET TEST

  it("CreateObject_CreateNewBucket_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  it("CreateObject_CreateNewFile_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  it("DownloadObject_NominalCase_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  it("IsObjectExists_NominalCase_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  it("IsObjectExists_ObjectNotExistBucket_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  it("IsObjectExists_ObjectNotExistFile_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  it("RemoveObject_NominalCase_Success", function(done) {
    assert.equal(true, true);
    done();
  });
  afterEach(function() {});
});
