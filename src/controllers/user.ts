import { Request, Response } from "express";
import User from "models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ massage: 'Ошибка на стороне сервера' });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send({ massage: 'Ошибка на стороне сервера' });
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find(req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ massage: 'Ошибка на стороне сервера' });
  }
}