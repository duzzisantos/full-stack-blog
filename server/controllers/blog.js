const BlogPost = require("../models/blog");

exports.create = (req, res) => {
  if (!req.body.ID) {
    res.status(500).send({ message: "Add something here!" });
    return;
  }

  const blogPost = new BlogPost({
    title: req.body.title,
    ID: req.body.ID,
    category: req.body.category,
    author: req.body.author,
    media1: req.body.media1,
    media2: req.body.media2,
    paragraph1: req.body.paragraph1,
    paragraph2: req.body.paragraph2,
    paragraph3: req.body.paragraph3,
    subheading1: req.body.subheading1,
    subheading2: req.body.subheading2,
    subheading3: req.body.subheading3,
  });

  blogPost
    .save(blogPost)
    .then((data) => {
      res.status(200).json(data);
      console.log("New post created successfully!");
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log("Error in creating new post! Cross-check data model!");
    });
};

exports.findAll = (req, res) => {
  const postID = req.query.id;
  var userCondition = postID
    ? { postID: { $regex: new RegExp(postID), $options: "i" } }
    : {};
  BlogPost.find(userCondition)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.code);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  BlogPost.findById(id).then((data) => {
    if (!data) {
      res.status(404).json({ message: "Not found!" });
    } else {
      res.json(data);
    }
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  BlogPost.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.status(200).json(data);
      console.log(`Blog with ID: ${id} has been updated successfully!`);
    }
  });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  BlogPost.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.json({ message: "Not found!", status: 404 });
      } else {
        res.json(data);
        console.log(`Blog with ID: ${id} has been deleted successfully!`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteAll = (req, res) => {
  BlogPost.deleteMany({})
    .then((data) => {
      res.json(data);
      console.log("All blog posts have been deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};
