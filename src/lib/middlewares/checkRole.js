export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden. Admin role required.' });
  }
};

export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    console.log('isUser pasado correctamente');
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden. User role required.' });
  }
};
