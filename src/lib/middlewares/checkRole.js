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

export const isPremiumCreate = (req, res, next) => {
  if (req.user && req.user.premium === true) {
    console.log('user is premium and can create/own products');
    next();
  } else {
    res
      .status(403)
      .json({ message: 'Access forbidden. Premium access required.' });
  }
};

export const isPremiumModifyOrDelete = (req, res, next) => {
  if (
    req.user &&
    req.user.premium === true &&
    req.product &&
    req.product.owner === req.user.email
  ) {
    console.log(
      'user is the owner of the product so they can modify/delete it'
    );
    next();
  } else if (req.user && req.user.role === 'admin') {
    console.log('user is admin so they can modify/delete products');
    next();
  } else {
    res
      .status(403)
      .json({
        message:
          'Access forbidden. Premium suscription or Admin role required.',
      });
  }
};
