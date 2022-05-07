module.exports = (app) => {
    const comment = require("../controllers/comments");
    var router = require("express").Router();
  
    router.post("/", comment.create);
    router.get("/", comment.findAll);
    router.get("/:id", comment.findOne);
    router.put("/:id", comment.update);
    router.delete("/:id", comment.deleteOne);
    router.delete("/", comment.deleteAll);
    app.use("/comments", router);
  };
  