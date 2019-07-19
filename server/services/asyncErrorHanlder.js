// HOF try/catch error handling
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      if (err === 'SequelizeDatabaseError') {
        res.status(err.status).json({ error: err.message });
        console.log(err);
      } else {
        res.json({ error: err });
        console.log(err);
      }
    }
  };
}

module.exports = asyncHandler;
