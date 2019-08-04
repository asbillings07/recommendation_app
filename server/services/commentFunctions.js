const { Comment } = require('../models');

const createComment = body =>
  Comment.create({
    comment: body.comment,
  });

const updateComment = (id, body) =>
  Comment.findOne({
    where: { userid: id },
  }).then(comment => {
    comment.update({
      comment: body.comment,
    });
  });

const getComment = id => Comment.findOne({ where: { userid: id } });

const deleteComment = id =>
  Comment.findOne({ where: { userid: id } }).then(comment => comment.destroy());

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
};
