export default app => {
    const Person = require("../controllers/people.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Person
    router.post("/", Person.create);
  
    // Retrieve all Persons
    router.get("/", Person.findAll);
  
    
  
    // Retrieve a single Person with id
    router.get("/:id", Person.findById);

    // Create a new Person
    router.post("/addpost", Person.addPost);
  
    app.use('/api/persons', router);
  };