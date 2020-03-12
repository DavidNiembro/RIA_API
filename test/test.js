var AWS = require("aws-sdk");
var chai = require("chai");
var fs = require("fs");
var http = require("http");
var assert = require("assert");
var AwsLabelDetectorImpl = require("../src/models/AwsLabelDetectorImpl");

describe("AWSRekognitionTests", function() {
  let awsDetector = new AwsLabelDetectorImpl();
  // BUCKET TEST
  it("[BUCKET] should be equal to the rekognitionJsonResult.json file", function(done) {
    awsDetector.MakeAnalysisRequest("emiratesa380.jpg", 1, function(data) {
      assert.equal(data, getFileResult("rekognitionJsonResult.json"));
      done();
    });
  });

  //BUCKET TEST
  it("[LOCAL] should be equal to the rekognitionJsonResult.json file", function(done) {
    awsDetector.MakeAnalysisRequestLocal("./test/emiratesa380.jpg", 1, function(
      data
    ) {
      assert.equal(data, getFileResult("rekognitionJsonResult.json"));
      done();
    });
  });
});

function parseJson(jsonText) {
  return JSON.parse(jsonText);
}

function stringifyJson(jsonObject) {
  return JSON.stringify(jsonObject);
}

function getFileResult(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function getFileResultRaw(filePath) {
  let res = fs.readFileSync(filePath);
  return res;
}

function stringifyJson(jsonObject) {
  return JSON.stringify(jsonObject);
}
