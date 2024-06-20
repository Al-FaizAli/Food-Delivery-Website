import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const {token} = req.headers;

  if (!token) {
    return res.status(401).json({success:false, message: 'Access Denied. No token provided.' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    res.status(400).json({success:false, message: 'Invalid token.' });
  }
};
