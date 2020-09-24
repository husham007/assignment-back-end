export default app => {
    const Post = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Post
    router.post("/", Post.create);
  
    // Retrieve all Posts
    router.get("/", Post.findAll); 
    
  
    // Retrieve a single Post with id
    router.get("/:id", Post.findById);
  
    app.use('/api/posts', router);
  };