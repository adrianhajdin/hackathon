import json
import bcrypt
import jwt
import boto3
from boto3.dynamodb.conditions import Key, Attr


def lambda_handler(event, context):
    if not event['email'] or not event['password'] or not event['firstName'] or not event['lastName']:
        return{
            'statusCode': 400,
            'message': 'Some part of the input is missing, please check and try again'
        }
        
    email = event['email']
    password = event['password']
    firstName = event['firstName']
    lastName = event['lastName']
    flag = event['flag']
    
    dynamodbClient = boto3.resource('dynamodb')
    userTable = dynamodbClient.Table('users')
    
    # user already exists
    try:
        try:
            response = userTable.scan(
                FilterExpression=Attr('email').eq(email)    
            )['Items'][0]
        except:
            response = None
        if response:
            raise Exception('already exists')
    except:
        return {
            'statusCode': 400,
            'message': 'User with this email already exists, please try again'
        }
    
    try:
        userTable.put_item(Item={
        'email':email,
        'firstName':firstName,
        'lastName':lastName,
        'password':password,
        'flag':flag
    })
    except:
        return {
            'statusCode': 400,
            'message': 'Register unsuccessful, please try again'
        }
    
    return {
        'statusCode': 200,
        'message': 'Registered successfully, welcome!'
    }
