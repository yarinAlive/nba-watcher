const mongoDbCrud = require('./mongodb-crud');
const ObjectID = require('mongodb').ObjectID;

const SUCCESS_200 = 200;
const BAD_REQUEST_400 = 400;
const SERVER_ERROR_500 = 500;
exports.updateNbaGame = async (event) => {
  let points = 0;
  let updateResult;
  try {
    const { homePoints } = event;
    if (+homePoints) {
      points = parseInt(homePoints);

      updateResult = await mongoDbCrud.updateOne(
        { _id: ObjectID('5d7d0de95df2fd0caf6ef3ff') },
        {
          $set:
            { homePoints: points }
        });

      return {
        statusCode: SUCCESS_200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          modifiedCount: updateResult.modifiedCount
        }
      };
    } else {
      return {
        statusCode: BAD_REQUEST_400
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: SERVER_ERROR_500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: error.message
    };
  }

};
