import { post, person, Sequelize } from "../models";
const Post = post;
const Person = person
const Op = Sequelize.Op;


exports.create = (req, res) => {
  
  const post = {
    how_saved: req.body.how_saved,
    when_saved: req.body.when_saved    
  };

  return Post.create(post)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
    });
  });
};

exports.findAll = (req, res) => {
  return Post.findAll({
    include: [
      {
        model: Person,
        as: "persons",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        
      },
    ],
  })
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding all posts."
    });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  return Post.findByPk(id, {
    include: [
      {
        model: Person,
        as: "persons",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        
      },
    ],
  })
    .then((person) => {
      res.send(person);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
    });
  });
};


