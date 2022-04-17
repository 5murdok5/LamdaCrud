const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const { title } = require('process')

const deleteTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const { id } = event.pathParameters

    await dynamodb
      .delete({
        TableName: 'TaskTable',
        Key: { id },
      })
      .promise()

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'task delete',
      }),
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  deleteTask,
}
