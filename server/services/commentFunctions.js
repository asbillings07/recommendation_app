const { Comment } = require('../models');

// verifies user by checking the comment where the recommendation id is equal to the param id
const verifyUser = id =>
  Comment.findOne({
    where: {
      recid: id,
    },
  });

// create comment
const createComment = (id, body, user) =>
  Comment.create({
    comment: body.comment,
    recid: id,
    userid: user.id,
  });
// update comment
const updateComment = (id, body) =>
  Comment.findOne({
    where: { recid: id },
  }).then(comment =>
    comment.update({
      comment: body.comment,
    })
  );
// gets comment
const getComment = id => Comment.findAll({ where: { recid: id } });
// deletes comment
const deleteComment = id =>
  Comment.findOne({ where: { recid: id } }).then(comment => comment.destroy());

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  verifyUser,
};
