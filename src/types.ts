import { Request } from 'express';

export interface IUser {
  name: String,
  about: String,
  avatar: String
}

export interface ICard {
  name: String,
  link: String,
  owner: IUser,
  likes: IUser[],
  createdAt: Date
}

export interface RequestCastom extends Request {
  user?: {
    _id: string
  }
}

export interface ErrorCastom extends Error {
  statusCode?: number
}
