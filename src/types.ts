export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: string;
}

export interface IUserResponse extends IUser {
  _id: string;
}
