const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const { title } = require('process')

const updateTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const { id } = event.pathParameters

    const { done, title, descripcion } = JSON.parse(event.body)

    await dynamodb
      .update({
        TableName: 'TaskTable',
        Key: { id },
        UpdateExpression:
          'set done = :done, title = :title, descripcion = :descripcion',
        ExpressionAttributeValues: {
          ':done': done,
          ':title': title,
          ':descripcion': descripcion,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise()

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'task updated',
      }),
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  updateTask,
}
