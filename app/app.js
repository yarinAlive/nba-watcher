const { nbaGamePointsOnChange } = require('./mongodb-watcher');

(async function () {
  await nbaGamePointsOnChange();
})();
