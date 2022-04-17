const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const addTask = async (event) => {
  const db = new AWS.DynamoDB.DocumentClient()

  const { title, descripcion } = JSON.parse(event.body)
  const createAt = new Date.now()
  const id = v4()

  const newTask = {
    id,
    title,
    descripcion,
    createAt,
    done: false,
  }
  await db
    .put({
      TableName: 'TaskTable',
      Item: newTask,
    })
    .promise()

  return {
    status: 200,
    body: JSON.stringify(newTask),
  }
}

module.exports = {
  addTask,
}
