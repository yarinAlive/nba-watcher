const { MongoClient } = require('mongodb');
const config = require('./config');
const { saveRecord } = require('./firestore/firestore-service');

const mongoDbUri = config.mongoDbUri;

const retrieveNbaDb = (() => {
  let mongoClient, nbaDb;
  return async () => {
    if (!mongoClient) {
      mongoClient = await MongoClient.connect(mongoDbUri,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          poolSize: 20
        });
    }

    if (!nbaDb) {
      nbaDb = mongoClient.db('nba');
    }
    return nbaDb;
  };
})();

async function nbaGamePointsOnChange() {
  try {
    const nbaDb = await retrieveNbaDb();

    const changeStream = nbaDb.collection('Game').watch(
      [
        {
          $match: {
            // Only listen specific field
            'updateDescription.updatedFields.homePoints': { $exists: true },
            operationType: 'update',
          }
        }
      ],
      { fullDocument: 'updateLookup' });

    changeStream.on('change', async next => {
      const document = next.fullDocument;
      const objectId = document._id.toString();
      document._id = objectId;
      try {
        await saveRecord(objectId, document);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  nbaGamePointsOnChange
};
