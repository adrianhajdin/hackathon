import json
import uuid
import boto3
import uuid

from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    if not event['x'] or not event['y'] or not event['type'] or not event['volume']:
        return {
            'statusCode': 400,
            'message': 'Invalid input, please check and try again'
        }
    
    xCoordinate = event['x']
    yCoordinate = event['y']
    typeContainer = event['type']
    volume = event['volume']
    address = event['address']
    fillPercentage = '0'
    id = uuid.uuid4().hex
    
    dynamodbClient = boto3.resource('dynamodb')
    containerTable = dynamodbClient.Table('containers')
    
    # container already exists
    try:
        try:
            response = containerTable.scan(
                FilterExpression=Attr('x').eq(xCoordinate) & Attr('y').eq(yCoordinate) & Attr('type').eq(typeContainer)
            )['Items'][0]
        except:
            response = None
        if response:
            raise Exception('already exists')
    except:
        return {
            'statusCode': 400,
            'message': 'Container already exists'
        }
    
    try:
        containerTable.put_item(Item={
            'id':id,
            'x':xCoordinate,
            'y':yCoordinate,
            'volume':volume,
            'typeOfContainer':typeContainer,
            'fillPercentage': fillPercentage,
            'address': address
        })
    except:
        return {
            'statusCode': 500,
            'message': 'Something\'s wrong, please try again'
        }
    
    return {
        'statusCode': 200,
        'message': 'Container added successfully',
        'containerID': id
    }
