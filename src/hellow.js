'use strict'

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hola esta es mi primera funcion!!!',
        input: event,
      },
      null,
      2,
    ),
  }
}
