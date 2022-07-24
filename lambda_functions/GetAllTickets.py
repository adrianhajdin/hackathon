import json
import boto3

def lambda_handler(event, context):
    dynamodbClient = boto3.resource('dynamodb')
    ticketsTable = dynamodbClient.Table('tickets')
    
    response = ticketsTable.scan()['Items']
    
    return {
        'statusCode': 200,
        'tickets': response
    }
