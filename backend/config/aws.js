const AWS = require("aws-sdk")
dotenv = require('dotenv')
const s3 = new AWS.S3({
    accessKeyId: "AKIA2PEPIMAG23IHP53H---000",
    secretAccessKey: "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---000",
    region: "us-east-1"
})


const bucketName = "testbuckethrproject";


module.exports = { s3, bucketName }