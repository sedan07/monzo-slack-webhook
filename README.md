# Monzo Slack Webhook - AWS Lambda Function

A basic example of using the [Monzo webhook functionality](https://monzo.com/docs/#webhooks) to fire a message into a Slack channel.

**Note**: This repo doesn't do anything useful, as the Monzo app already notifies you when transactions happen. It's just for fun.

## How it works

Using the [Claudia.js](https://claudiajs.com) toolset to provide the creation and management of an AWS API Gateway resourc, linked to a Lambda function.

When a POST request is made to the API Gateway endpoint it triggers the lambda function. Which in turn reads in the event data sent by Monzo, formats into a friendly message and POSTS to a Slack channel via webhook.

## Deployemnt

To deploy this repo you will need:

* AWS account and credentials.
* Slack account and permission to create an app.
* A Monzo account

### Slack app integration

Create a new App within slack and create a new Webhook URL.

### Deploying to AWS

Ensure you have AWS credentials setup on the command line and run:

```
./node_modules/.bin/claudia create --region eu-west-1 --api-module main --set-env SLACK_WEBHOOK=<<YOUR SLACK WEBHOOK URL HERE>>>
```

### Registering the webook with Monzo

To prevent duplication, see: [https://monzo.com/docs/#webhooks](https://monzo.com/docs/#webhooks)
