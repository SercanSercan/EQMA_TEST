import json
from boto3 import resource
from decimal import Decimal

dynamodb = resource('dynamodb')
table = dynamodb.Table("EqLogs")

def lambda_handler(event, context):
    try:
        response = table.scan()
        items = response.get('Items', [])

        # Sort items by Timestamp
        items.sort(key=lambda x: x.get('Timestamp', ''), reverse=True)

        # Remove ExpiryTime field from each item
        for item in items:
            item.pop('ExpiryTime', None)

        return {
            "statusCode": 200,
            "headers": { "Access-Control-Allow-Origin": "*" },
            "body": json.dumps(items, cls=DecimalEncoder)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"Failed to scan table: {str(e)}"
        }

# Helper to convert Decimal to float for JSON serialization
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)