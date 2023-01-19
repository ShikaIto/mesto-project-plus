import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RequestCastom } from '../types';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find().populate('owner');
    return res.status(200).send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req: RequestCastom, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user?._id });
    await newCard.populate('owner');
    return res.status(201).send(newCard);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ ...error, message: 'Ошибка валидации' });
    }

    return next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.cardId;
    const card = await Card.findById(id);
    if (!card) {
      throw new NotFoundError('карточка не найдена');
    }
    await card.remove();
    return res.status(200).send({ message: 'Пост удален' });
  } catch (error) {
    return next(error);
  }
};

export const likeCard = async (req: RequestCastom, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user?._id;
    const card = await Card
      .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true });
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const result = await Card.findById(cardId, 'likes -_id').populate('likes');
    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ ...error, message: 'Ошибка валидации' });
    }
    return next(error);
  }
};

export const dislikeCard = async (req: RequestCastom, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user?._id;
    const card = await Card
      .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true });
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const result = await Card.findById(cardId, 'likes -_id').populate('likes');
    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ ...error, message: 'Ошибка валидации' });
    }
    return next(error);
  }
};
