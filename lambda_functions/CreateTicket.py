import json
import uuid
import boto3
import uuid
import datetime

from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    if not event['x'] or not event['y'] or not event['title'] or not event['description']:
        return {
            'statusCode': 400,
            'message': 'Invalid input, please check and try again'
        }
    
    id = uuid.uuid4().hex
    xCoordinate = event['x']
    yCoordinate = event['y']
    title = event['title']
    description = event['description']
    date = datetime.datetime.now()
    
    dynamodbClient = boto3.resource('dynamodb')
    ticketTable = dynamodbClient.Table('tickets')
    
    # container already exists
    try:
        try:
            response = ticketTable.scan(
                FilterExpression=Attr('title').eq(title) & Attr('description').eq(description)
            )['Items'][0]
        except:
            response = None
        if response:
            raise Exception('already exists')
    except:
        return {
            'statusCode': 400,
            'message': 'Ticket already exists'
        }

    try:
        ticketTable.put_item(Item={
            'id':id,
            'x':xCoordinate,
            'y':yCoordinate,
            'title':title,
            'description':description,
            'status': 0,
            'creationDateAndTime': str(date)
        })
    except:
        return {
            'statusCode': 500,
            'message': 'Something\'s wrong, please try again'
        }
    
    return {
        'statusCode': 200,
        'message': 'Ticket added successfully'
    }
