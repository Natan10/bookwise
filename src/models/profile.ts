export type Profile = {
  id: number;
  email: string;
  username: string | null;
  avatar: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
