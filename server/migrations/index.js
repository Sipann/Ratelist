module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('"Ratings"', [{
      userName: 'yy6sake8jqanxinb3yoxa44xw',
      trackId: '6sCYUYJkkqP5wJG4ccLGuA',
      rating: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('"Ratings"', null, {});
  }
};