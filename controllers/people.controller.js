import { person, post, Sequelize } from "../models";
const Person = person;
const Post = post
const Op = Sequelize.Op;

// Create and Save a new Person
exports.create = (req, res) => {

  const person = {
    name: req.body.name,
  };
  return Person.create(person)
    .then((person) => {
      res.send(person);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person."
    });
  });
};


exports.findAll = (req, res) => {
  return Person.findAll({
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "how_saved", "when_saved"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((person) => {
      res.send(person);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding all Person."
    });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  
  return Person.findByPk(id, {
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "how_saved", "when_saved"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((person) => {
     res.send(person);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Person with id=" + id
      });
    });
};
  
exports.addPost = (req, res) => {
  
  let personIds = req.body.ids
  //const postId = req.body.postId
  console.log(req.body)
   
 
  
  return Post.create({how_saved: req.body.how_saved,when_saved: req.body.when_saved})
    .then((pos) => {
      if (!pos) {
        console.log("Post not found!");
        return null
        }
        
        for (let i = 0; i <= personIds.length; i++) {
          
            Person.findByPk(personIds[i]).then((prson) => {
              if (prson) {
                console.log("Person id!", prson.id);        
              }        
  
          prson.addPost(pos);
  
          console.log(`>> added Post id=${pos.id} to person id=${prson.id}`);
        
        }).catch((err)=>{
          console.log(err)
        })
          
          //console.log(idd)
          
      ;
        }
        res.send(pos);
         
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

