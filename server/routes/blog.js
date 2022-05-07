module.exports = (app) => {
    const blog = require("../controllers/blog");
    var router = require("express").Router();
    
    router.post("/", blog.create);
    router.get("/", blog.findAll);
    router.get("/:id", blog.findOne);
    router.put("/:id", blog.update);
    router.delete("/:id", blog.deleteOne);
    router.delete("/", blog.deleteAll);
    app.use("/blog", router);
  };
  