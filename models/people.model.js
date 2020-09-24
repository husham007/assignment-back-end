module.exports = (sequelize, Sequelize) => {
    const People = sequelize.define("people", {
      name: {
        type: Sequelize.STRING
      },      
    });
    exports.People = People
    return People;
  };
  