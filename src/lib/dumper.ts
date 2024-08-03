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
    console.log("starting dump process");
    await new Promise((resolve) => {
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
        stdio: ["inherit", "pipe", "pipe"],
      });

      dump.stderr.on("data", (err) => console.error(err.toString()));

      dump.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        resolve(code);
      });
    });
  }
}

export { Dumper };
