const { findUserByEmail, findUserById } = require('./userFunctions');
const { sendEmail } = require('./emailSend');
const messages = require('./emailMessages');
const template = require('./emailTemplates');
const asyncHandler = require('./asyncErrorHanlder');

exports.collectEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user && !user.confirmed) {
    sendEmail(template.confirm(user.id, user.email), messages.confirm).catch(
      err => console.log(err)
    );
    next();
  } else {
    res.json({ message: messages.alreadyConfirmed });
    next();
  }
});

exports.confirmEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await findUserById(id);
  if (!user) {
    res.json({ message: messages.couldNotFind });
  } else if (user && !user.confirmed) {
    user
      .update({
        confirmed: true,
      })
      .then(() => res.json({ message: messages.confirmed }))
      .catch(err => console.log(err));
  }
});
