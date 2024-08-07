import { spawn } from "node:child_process";
import path from "path";

export type Options = {
  ssl?: boolean;
};

export type Credentials = {
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
};

class Dumper {
  credentials: Credentials;
  connectionPath: string;
  ssl: boolean;

  constructor(
    credentials: Credentials,
    connectionId: string,
    options: Options
  ) {
    this.credentials = credentials;
    this.connectionPath = this.getConnectionPath(connectionId);
    this.ssl = options.ssl ?? false;
  }

  getConnectionPath(connectionId: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);
    return connectionPath;
  }

  async dump() {
    await new Promise((resolve, reject) => {
      const { host, port, database, user, password } = this.credentials;
      let script = `/usr/bin/pg_dump --dbname=postgresql://${user}:${password}@${host}:${port}/${database}`;

      if (this.ssl) {
        script += "?sslmode=require";
      }

      const file = path.join(
        this.connectionPath,
        Date.now().toString() + ".dump"
      );

      const dump = spawn(`${script} -f ${file}`, {
        shell: true,
        stdio: ["inherit", "inherit", "pipe"],
      });

      dump.stderr.on("data", (err) => {
        dump.emit("close", err.toString());
      });

      dump.on("close", (codeOrErrorMessage: number | string) => {
        if (codeOrErrorMessage === 0) {
          resolve(0);
        } else {
          reject({ message: codeOrErrorMessage });
        }
      });
    });
  }
}

export { Dumper };
