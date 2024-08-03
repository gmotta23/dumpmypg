import { spawn } from "node:child_process";

export type Options = {
  file?: string;
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
  file: string;
  ssl: boolean;

  constructor(credentials: Credentials, options: Options) {
    this.credentials = credentials;
    this.file = options.file ?? "db.dump";
    this.ssl = options.ssl ?? false;
  }
  dump() {
    console.log("starting dump process");
    const { host, port, database, user, password } = this.credentials;
    let script = `/usr/bin/pg_dump --dbname=postgresql://${user}:${password}@${host}:${port}/${database}`;

    if (this.ssl) {
      script += "?sslmode=require";
    }

    const dump = spawn(`${script} -f ${this.file}`, {
      shell: true,
      stdio: ["inherit", "pipe", "pipe"],
    });

    dump.stderr.on("data", (err) => console.error(err.toString()));

    dump.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
}

export { Dumper };
