export type Connection = {
  id?: string;
  name?: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
};

export type Dump = {
  name: string;
  createdAt: Date;
  size: string;
};
