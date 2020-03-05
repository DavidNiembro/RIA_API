var AWS = require("aws-sdk");
var chai = require("chai")
var fs = require('fs');
var http = require('http');
var assert = require('assert')



AWS.config.loadFromPath("./config.json");
var rekognition = new AWS.Rekognition();


describe("AWSRekognitionTests", function() {
  // BUCKET TEST
  it('[BUCKET] should be equal to the rekognitionJsonResult.json file', function(done) {
    var params = {
      Image: {
        S3Object: {
          Bucket: 'aws.rekognition.actualit.info',
          Name: 'emiratesa380.jpg'
        }
      },
      MaxLabels: 1,
      MinConfidence: 90
    };

    rekognition.detectLabels(params, function(err, data) {
      if (err)
      {
        console.log(err, err.stack);
      }
      // an error occurred
      else
      {
        let jsonObject = parseJson(JSON.stringify(data));
        let jsonStringified = stringifyJson(jsonObject);
        assert.equal(jsonStringified, getFileResult('rekognitionJsonResult.json'))
        done();
      }
    });
  });

  // LOCAL TEST
  it('[LOCAL] should be equal to the rekognitionJsonResult.json file', function(done) {
    this.timeout(10000)
    // console.log(Buffer.from(getFileResult('./test/emiratesa380.jpg')).toString('base64'))
    var params = {
      Image: {
        "Bytes": getFileResultRaw('./test/emiratesa380.jpg'),
      },
      MaxLabels: 1,
      MinConfidence: 90
    };

    rekognition.detectLabels(params, function(err, data) {
      if (err)
      {
        console.log(err, err.stack);
      }
      // an error occurred
      else
      {
        let jsonObject = parseJson(JSON.stringify(data));
        let jsonStringified = stringifyJson(jsonObject);
        assert.equal(jsonStringified, getFileResult('rekognitionJsonResult.json'))
        done();
      }
    });
  });

});


function parseJson(jsonText)
{
  return JSON.parse(jsonText);
}

function stringifyJson(jsonObject)
{
  return JSON.stringify(jsonObject);
}

function getFileResult(filePath)
{
  return fs.readFileSync(filePath, 'utf8');
}

function getFileResultRaw(filePath)
{
  let res = fs.readFileSync(filePath);
  return res;
}

function stringifyJson(jsonObject)
{
  return JSON.stringify(jsonObject);
}
