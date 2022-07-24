import json
import boto3

from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    if not event['id']:
        return {
            'statusCode': 400,
            'message': 'Invalid input, please check and try again'
        }
    
    id = event['id']
    
    dynamodbClient = boto3.resource('dynamodb')
    containerTable = dynamodbClient.Table('containers')
    
    #check if the container exists
    containerTable.scan(
            FilterExpression=Attr('id').eq(id)
        )['Items'][0]
    try:
        containerTable.scan(
            FilterExpression=Attr('id').eq(id)
        )['Items'][0]
    except:
        return {
            'statusCode': 400,
            'message': "Container doesn\'t exist, please check your input"
        }
    
    containerTable.delete_item(
        Key={'id': id}
    )
    
    return {
        'statusCode': 200,
        'message': "Delete successful"
    }
