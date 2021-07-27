import boto3
import os, json

bucketName = os.environ['BUCKET_NAME']

def lambda_handler(event, context):
    try:
        fileName   = event['fileName']
        objectKey  = f"image/{fileName}"
        signedURL = boto3.client('s3').generate_presigned_url(
            ClientMethod='put_object', 
            Params={'Bucket': bucketName, 'Key': objectKey},
            ExpiresIn=300)
        return {
            "statusCode": 200,
            "body": json.dumps({
                "signedURL": signedURL
            })
        }
    except KeyError as error:
        return {
            "statusCode": 400,
            "body": error
        }
    except Exception as error:
        return {
            "statusCode": 500,
            "body": error
        }