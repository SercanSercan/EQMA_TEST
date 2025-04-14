import re
import urllib.request
from bs4 import BeautifulSoup
import time
import boto3
from decimal import Decimal

MAX_LINES = 100
TARGET_URL = "http://www.koeri.boun.edu.tr/scripts/lst1.asp"

def lambda_handler(event, context):
    content = fetchHtmlContent()        # Fetch
    if content == None:
        return {
            'statusCode': 500,
            'body': 'HTML fetch operation failed on target url'
        }

    raw_logs = extractLogs(content)     # Extract
    eq_json_logs = parseLogs(raw_logs)  # Transform
    loadIntoDynamoDB(eq_json_logs)      # Load

    return {
        'statusCode': 200,
        'body': 'Earthquake logs stored into DynamoDB table successfully'
    }

def fetchHtmlContent():
    content = None
    try:
        with urllib.request.urlopen(TARGET_URL) as response:
            content_bytes = response.read()
            encoding = response.headers.get_content_charset(failobj="iso-8859-9")  # fallback for Turkish
            content = content_bytes.decode(encoding)
    except Exception as e:
        print(f"Error: {e}")

    print("Downloaded html content successfully.")
    return content

def extractLogs(content):
    soup = BeautifulSoup(content, 'html.parser')
    return soup.find('pre').text

def parseLogs(raw_logs):
    eq_logs = []
    expiryTime = int(time.time()) + 24 * 60 * 60
    lines = raw_logs.split('\n')
    lines = [line.replace('\xa0', ' ').strip() for line in lines]
    eq_log_pattern = re.compile(
        r'^(\d{4}\.\d{2}\.\d{2})\s+'                 # Date
        r'(\d{2}:\d{2}:\d{2})\s+'                    # Time
        r'([\d\.]+)\s+'                              # Latitude
        r'([\d\.]+)\s+'                              # Longitude
        r'([\d\.]+)\s+'                              # Depth
        r'(\S+)\s+(\S+)\s+(\S+)\s+'                  # MD ML Mw
        r'(.+?)\s{2,}'                               # Place
        r'(\S+)'                                     # Quality
        r'(?:\s+\(\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}\))?$'  # Optional review timestamp
    )

    for i in range(MAX_LINES):
        if i >= len(lines):
            print("Reached max lines.")
            break

        line = lines[i]
        match = eq_log_pattern.match(line)
        if match:
            date, time_str, lat, lon, depth, md, ml, mw, place, quality = match.groups()
            current_log = {
                'Timestamp': date + " " + time_str,
                'Latitude': Decimal(lat),
                'Longitude': Decimal(lon),
                'Depth': Decimal(depth),
                'Magnitude': Decimal(ml),
                'Location': place,
                'ExpiryTime': expiryTime
            }
            eq_logs.append(current_log)

    return eq_logs

def loadIntoDynamoDB(eq_json_logs):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('EqLogs')

    with table.batch_writer(overwrite_by_pkeys=['Timestamp']) as batch:
        for item in eq_json_logs:
            batch.put_item(Item=item)
