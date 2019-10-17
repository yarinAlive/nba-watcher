const { MongoClient } = require('mongodb');
const { mongoDbUri } = require('./config');

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

const updateOne = async (query, update, options) => {
  try {
    const db = await retrieveNbaDb();
    return await db.collection('Game').updateOne(query, update, options);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { updateOne };
