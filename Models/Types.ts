export type User = {
  name: string;
  email: string;
  image: string;
  emailVerfied: boolean;
  key: string;
  friends: User[];
};
export type Chat = {
  users: User[];
  name: string;
  image: string;
  group: boolean;
};
export type Message = {
  body: string;
  sendFrom: User;
};
