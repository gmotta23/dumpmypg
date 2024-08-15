import crypto from "crypto";
import { Connection } from "./definitions";

export const formatScript = (
  credentials: Partial<Connection>,
  hidePassword = false
) => {
  const { host, port, database, user, ssl } = credentials;
  let { password } = credentials;

  if (hidePassword) {
    password = "{password}";
  }

  let script = `/usr/bin/pg_dump --dbname=postgresql://${user}:${password}@${host}:${port}/${database}`;

  if (ssl) {
    script += "?sslmode=require";
  }

  return script;
};

export function generateUUID() {
  return crypto.randomUUID().toString();
}
