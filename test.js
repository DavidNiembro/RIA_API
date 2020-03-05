var AWS = require("aws-sdk");
var fs = require('fs');
var http = require('http');

AWS.config.loadFromPath("./config.json");

async function getResult() {
    return http.get('http://localhost:2000/api/imagerecognition?bucket=aws.rekognition.actualit.info&filename=emiratesa380.jpg', (res) => {
        // console.log(res.body);
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                // const parsedData = JSON.parse(rawData);
                return rawData;
            } catch (e) {
                console.error(e.message);
            }
        });
    });
}

async function callFunc() {
    let result = await getResult();
    console.log(result);
}

function getRekognitionResult(bucket, filename)
{
    var params = {
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: filename
            }
        },
        MaxLabels: 1,
        MinConfidence: 90
    };

    var rekognition = new AWS.Rekognition();
    rekognition.detectLabels(params, function(err, data) {
        if (err)
        {
            console.log(err, err.stack);
        }
        // an error occurred
        else
        {
            return data;
        }
    }); // successful response
}

console.log(getRekognitionResult("aws.rekognition.actualit.info", "emiratesa380.jpg"));
