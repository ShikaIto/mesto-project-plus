import { Router } from 'express';
import {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/card';

const cardRoutes = Router();

cardRoutes.get('/', getCards);

cardRoutes.post('/', createCard);

cardRoutes.delete('/:cardId', deleteCard);

cardRoutes.put('/:cardId/likes', likeCard);

cardRoutes.delete('/:cardId/likes', dislikeCard);

export default cardRoutes;