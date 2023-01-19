import { Router } from 'express';
import {
  getUsers, createUser, getUser, updateUser, updateAvatar,
} from '../controllers/user';

const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.post('/', createUser);

userRoutes.get('/:userId', getUser);

userRoutes.patch('/me', updateUser);

userRoutes.patch('/me/avatar', updateAvatar);

export default userRoutes;
