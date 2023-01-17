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