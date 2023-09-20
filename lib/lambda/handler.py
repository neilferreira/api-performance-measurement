import logging
import json


logger = logging.getLogger(__name__)

# Setup the basic logging configuration and date formatting
logging.basicConfig(
    format="%(asctime)s.%(msecs)03d %(levelname)s %(module)s:%(lineno)s %(message)s",
    datefmt="%d/%m/%Y %H:%M:%S",
)
# Limit the root logger to INFO
logging.getLogger().setLevel(logging.INFO)


#
# See https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html
#
def response(status, body):
    return {
        "isBase64Encoded": False,
        "statusCode": status,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body) if type(body) in [dict, list] else body,
    }


def handler(event, context=None):
    logger.info(event)

    return response(200, {"hello": "world"})
