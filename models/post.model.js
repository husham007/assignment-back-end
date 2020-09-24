

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      how_saved: {
        type: Sequelize.STRING
      },
      when_saved: {
        type: Sequelize.DATE
      },
    });
  
    return Post;
  };

  