import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RequestCastom } from '../types';
import NotFoundError from '../errors/not-found-err';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.status(201).send(newUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    return next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('пользователь не найден');
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    return next(error);
  }
};

export const updateUser = async (req: RequestCastom, res: Response, next: NextFunction) => {
  try {
    const id = req.user?._id;
    const { name, about } = req.body;
    const user = await User
      .findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('пользователь не найден');
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    return next(error);
  }
};

export const updateAvatar = async (req: RequestCastom, res: Response, next: NextFunction) => {
  try {
    const id = req.user?._id;
    const { avatar } = req.body;
    const user = await User
      .findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('пользователь не найден');
    }
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    return next(error);
  }
};
