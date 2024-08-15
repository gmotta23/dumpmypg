import { spawn } from "node:child_process";
import path from "path";
import { formatScript } from "./utils";
import { Connection } from "./definitions";

class Dumper {
  credentials: Partial<Connection>;
  connectionPath: string;

  constructor(credentials: Partial<Connection>, connectionId: string) {
    this.credentials = credentials;
    this.connectionPath = this.getConnectionPath(connectionId);
  }

  getConnectionPath(connectionId: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);
    return connectionPath;
  }

  async dump() {
    await new Promise((resolve, reject) => {
      const script = formatScript(this.credentials);

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
