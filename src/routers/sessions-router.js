import { Router } from 'express';
import passport from 'passport';
import '../jwt/jwt.js';

const currentRouter = Router();

currentRouter.get(
  '/current',
  passport.authenticate('jwtCookies', { session: false }),
  (req, res) => {
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Unauthorized del router' });
    }
  }
);

export default currentRouter;
