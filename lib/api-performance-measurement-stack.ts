import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_lambda as lambda,
  aws_apigateway as apigateway,
} from "aws-cdk-lib";

interface APIProps extends cdk.StackProps {
  endpointType: apigateway.EndpointType;
}
class API extends Construct {
  constructor(scope: Construct, id: string, props: APIProps) {
    super(scope, id);

    const { endpointType } = props;

    const apiLambda = new lambda.Function(this, "lambdaFn", {
      timeout: cdk.Duration.seconds(30),
      runtime: lambda.Runtime.PYTHON_3_11,
      memorySize: 2560,
      handler: "handler.handler",
      code: lambda.Code.fromAsset(__dirname + "/lambda"),
    });

    const api = new apigateway.LambdaRestApi(this, "Api", {
      handler: apiLambda,
      proxy: true,
      endpointConfiguration: {
        types: [endpointType],
      },
    });

    new cdk.CfnOutput(this, `${endpointType}APITestCommand`, { value: `./curl_for_latency.sh ${api.url}` });
    new cdk.CfnOutput(this, `${endpointType}APITestCommand2`, { value: `python python_for_latency.py ${api.url}` });
  }
}

export class ApiPerformanceMeasurementStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new API(this, "EdgeHostedAPI", {
      endpointType: apigateway.EndpointType.EDGE,
    });
    new API(this, "RegionalHostedAPI", {
      endpointType: apigateway.EndpointType.REGIONAL,
    });
  }
}
