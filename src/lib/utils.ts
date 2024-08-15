import crypto from "crypto";
import { Connection } from "./definitions";

export const formatScript = (
  credentials: Partial<Connection>,
  isPreview = false
) => {
  const { host, port, database, user, ssl } = credentials;
  let { password } = credentials;
  let caller = isPreview ? "pg_dump" : "/usr/bin/pg_dump";

  if (isPreview) {
    password = "{password}";
  }

  let script = `${caller} --dbname=postgresql://${user}:${password}@${host}:${port}/${database}`;

  if (ssl) {
    script += "?sslmode=require";
  }

  return script;
};

export function generateUUID() {
  return crypto.randomUUID().toString();
}
