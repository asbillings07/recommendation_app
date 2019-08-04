const { Comment } = require('../models');

// create comment
const createComment = body =>
  Comment.create({
    comment: body.comment,
  });
// update comment
const updateComment = (id, body) =>
  Comment.findOne({
    where: { userid: id },
  }).then(comment => {
    comment.update({
      comment: body.comment,
    });
  });
// gets comment
const getComment = id => Comment.findOne({ where: { userid: id } });
// deletes comment
const deleteComment = id =>
  Comment.findOne({ where: { userid: id } }).then(comment => comment.destroy());

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
};
