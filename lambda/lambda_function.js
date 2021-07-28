const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()
const URL_EXPIRATION_SECONDS = 300

// Main Lambda entry point
exports.handler = async (event) => {
  if ('fileName' in event && 'fileType' in event) {
    return await getSignedURL(event)
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Bad request, have no fileName or fileType in body"
      })
    }
  }
}

const getSignedURL = async (event) => {
  const fileName = event['fileName']
  const fileType = event['fileType']
  const objectKey = `image/${fileName}`
  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.bucketName,
    Key: objectKey,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: fileType
  }
  const signedURL = await s3.getSignedUrlPromise('putObject', s3Params)
  return {
    statusCode: 200,
    body: JSON.stringify({
      signedURL: signedURL
    })
  }
}