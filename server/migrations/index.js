module.exports = {
  up: (_) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('"Ratings"', null, {});
  }
};