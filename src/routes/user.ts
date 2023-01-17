import { Router } from "express";
import { getUsers, createUser, getUser } from "controllers/user";

const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.post('/', createUser);

userRoutes.get('/:userId', getUser);

export default userRoutes;