const Comment = require("../models/comments")

exports.create = (req, res) => {
  if (!req.body) {
    console.log("Comments must contain text content!");
    return;
  }

  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });

  comment
    .save(comment)
    .then((data) => {
      res.json(data);
      console.log("New comment added!");
    })
    .catch((err) => {
      console.log(err || "Could not add comment for some reason!");
    });
};

exports.findAll = (req, res) => {
  const commentID = req.query.id;
  var userCondition = commentID
    ? { commentID: { $regex: new RegExp(commentID), $options: "i" } }
    : {};
  Comment.find(userCondition)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Comment.findOneById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Not found" });
        console.log(`Comment with ID: ${id} not found!`);
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndUpdate(id, { $set: req.body }, (err, data, next) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.json(data);
      console.log(`Comment with ID: ${id} has been updated successfully!`);
    }
  }).catch((err) => {
    console.log(err);
  });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json(data);
        console.log(`Comment with ID: ${id} has been deleted successfully!`);
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err.status || err.statusText);
      }
    });
};

exports.deleteAll = (req, res) => {
  Comment.deleteMany({})
    .then((data) => {
      res.json(data);
      console.log("All comments have been deleted successfully!");
    })
    .then((err) => {
      err.status(404)
      console.log(err.status || err.statusText);
    });
};
