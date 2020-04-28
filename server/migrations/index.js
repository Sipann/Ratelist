module.exports = {
  up: (_) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('"Ratings"', null, {});
    await queryInterface.bulkDelete('"Users"', null, {});
    return true;
  }
};