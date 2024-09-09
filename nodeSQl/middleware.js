const TokenMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: 'Please Login First' });
    }
    req.TokenId = +token.split(' ')[1];
    next();
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

module.exports = TokenMiddleware;
