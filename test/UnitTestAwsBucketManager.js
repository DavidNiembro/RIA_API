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
    bucketName = "testsbucket";
    //bucketName = "awsdevteam";
    domain = "actualit.info";
    bucketUrl = bucketName + "." + domain;
    imageName = "emiratesa380.jpg";
    fullPathToImage = "./test/" + imageName;
    prefixObjectDownloaded = "downloaded";
    bucketManager = new AwsBucketManagerImpl(bucketUrl);
  });

  // BUCKET TEST

  it("CreateObject_CreateNewBucket_Success", async function(done) {
    //given
    //let beforeCreation = await bucketManager.IsObjectExists(bucketUrl);
    //assert.equal(beforeCreation, false);

    //when
    //await bucketManager.CreateObject(bucketUrl);

    //then
    //let afterCreation = await bucketManager.IsObjectExists(bucketUrl);
    //assert.equal(afterCreation, true);
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
  it("IsObjectExists_NominalCase_Success", async function() {
    //given
    // let bucketName = "testBucket";
    // let bucketUrl = bucketName + "//" + domain;
    //await bucketManager.CreateObject(bucketUrl);

    //when
    let actualResult = await bucketManager.IsObjectExists(bucketUrl);

    //then
    assert.equal(actualResult, true);
  });

  it("IsObjectExists_ObjectNotExistBucket_Success", async function() {
    //given
    let notExistingBucket = "notExistingBucket" + domain;

    //when
    let actualResult = await bucketManager.IsObjectExists(notExistingBucket);

    //then
    assert.equal(actualResult, false);
  });
  it("IsObjectExists_ObjectNotExistFile_Success", function(done) {
    assert.equal(true, false);
    done();
  });
  it("RemoveObject_NominalCase_Success", async function(done) {
    //given
    //await bucketManager.CreateObject(bucketUrl);

    //let beforeRemoving = await bucketManager.IsObjectExists(bucketUrl);
    //assert.equal(beforeRemoving, true);

    //when
    //await bucketManager.RemoveObject(bucketUrl);

    //then
    //let afterRemoving = await bucketManager.IsObjectExists(bucketUrl);
    //assert.equal(afterRemoving, false);
    assert.equal(true, false);
    done();
  });
  afterEach(function() {
    //TODO remove all dev bucket
    // let destinationFullPath = this.pathToTestFolder + "//" + this.prefixObjectDownloaded + "*";
    // if (fs.existsSync(destinationFullPath)) {
    //   fs.unlinkSync(destinationFullPath);
    // }
    // bucketManager = new AwsBucketManagerImpl(bucketUrl);
    // if (bucketManager.IsObjectExists(bucketUrl)) {
    //   bucketManager.RemoveObject(bucketUrl);
    // }
  });
});
