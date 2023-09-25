/* eslint-disable no-new */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as utils from 'src/utils';
import { Construct } from 'constructs';

import { aws_lambda as lambda, aws_apigateway as apiGateway } from 'aws-cdk-lib';

class DeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, readonly props?: cdk.StackProps) {
    super(scope, id, props);

    const apiLambda = new lambda.Function(this, utils.getConstructName('api'), {
      functionName: utils.getConstructName('api'),
      description: utils.getConstructDescription('api'),
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'bundle/entrypoint.default.handler',
      code: lambda.Code.fromAsset(path.join(require.resolve('@typescript-backend-cdk-starter/api'), '../../bundle.zip')),
    });

    new apiGateway.LambdaRestApi(this, utils.getConstructName('endpoint'), {
      handler: apiLambda,
    });
  }
}

export default DeploymentStack;
