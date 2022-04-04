export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerfied: boolean;
  key: string;
  friends: User[];
};
export type Chat = {
  _id: string;
  members: User[];
  name?: string;
  image?: string;
  group: boolean;
  lastMessage: Message;
};
export type Message = {
  _id: string;
  body: {
    text: string;
  };
  sendFrom: User;
};
