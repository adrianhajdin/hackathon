import json
import boto3

def lambda_handler(event, context):
    dynamodbClient = boto3.resource('dynamodb')
    containersTable = dynamodbClient.Table('containers')
    
    response = containersTable.scan()['Items']
    
    return {
        'statusCode': 200,
        'containers': response
    }
