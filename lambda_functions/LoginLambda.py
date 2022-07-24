import json
import bcrypt
import jwt
import boto3
import os
from boto3.dynamodb.conditions import Key, Attr


def lambda_handler(event, context):
    if not event['email'] or not event['password']:
        return{
            'statusCode': 400,
            'message': 'Email or password missing, please check your input'
        }
        
    email = event['email']
    password = event['password']
    
    dynamodbClient = boto3.resource('dynamodb')
    userTable = dynamodbClient.Table('users')
    
    try:
        response = userTable.scan(
            FilterExpression=Attr('email').eq(email)    
        )['Items'][0]
        print(response['password'] == password)
        if not response['password'] == password:
            raise Exception('Wrong')
    except:
        return {
            'statusCode': 400,
            'message': 'User not found or password is incorrect, please try again'
        }
    
    fullName = '{} {}'.format(response['firstName'], response['lastName'])
    
    payload = {
        'email': response['email'],
        'fullName': fullName
    }
    
    jwtToken = jwt.encode(payload=payload, key=os.environ['SECRET_KEY'])
    
    return {
        'statusCode': 200,
        'body': 'Logged in successfully, welcome!',
        'jwt': jwtToken,
        'flag': 'user'
    }
