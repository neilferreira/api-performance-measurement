# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


## Running this example project

Deploy 2x AWS API Gateway REST APIs, one Regional and one Edge.

```
AWS_DEFAULT_REGION=us-east-2 npm run cdk deploy ApiPerformanceMeasurementStack
```

This will export 2x exports with a command that can be used to measure the performance of both API endpoints.
