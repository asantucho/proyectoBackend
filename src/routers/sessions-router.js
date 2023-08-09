import { Router } from 'express';
import passport from 'passport';
import '../lib/jwt/jwt.js';
import UsersRepository from '../daos/mongoDB/repository/users-repository.js';

const currentRouter = Router();

currentRouter.get(
  '/current',
  passport.authenticate('jwtCookies', { session: false }),
  async (req, res) => {
    try {
      if (req.user) {
        const userId = req.user._id;
        const usersRepository = new UsersRepository();
        const userDTO = await usersRepository.getCurrent(userId);
        res.json({ user: userDTO });
      } else {
        res.status(401).json({ error: 'Unauthorized del router' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default currentRouter;
