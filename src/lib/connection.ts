import fs from "fs";
import prettyBytes from "pretty-bytes";
import { Connection } from "./definitions";
import { generateUUID } from "./utils";
import path from "path";

const fsp = fs.promises;

class ConnectionStorage {
  static connectionFile = "connection.json";

  static async createConnection(connection: Connection) {
    const key = Date.now() + "_" + generateUUID();

    const connectionPath = path.join(process.cwd(), "data", key);

    await fsp.mkdir(connectionPath);

    await fsp.writeFile(
      path.join(connectionPath, this.connectionFile),
      JSON.stringify(connection)
    );
  }

  static async getConnections() {
    const connectionsPath = path.join(process.cwd(), "data");

    const directories = await fsp.readdir(connectionsPath);

    const loadConnection = (connectionId: string) => {
      return this.getConnection(connectionId);
    };

    return Promise.all(directories.map(loadConnection));
  }

  static async getConnection(
    connectionId: string,
    options = { hidePassword: true }
  ) {
    const connectionPath = path.join(
      process.cwd(),
      "data",
      connectionId,
      this.connectionFile
    );
    const connection = JSON.parse(
      (await fsp.readFile(connectionPath)).toString()
    ) as Partial<Connection>;
    if (options.hidePassword) {
      delete connection.password;
    }
    connection.id = connectionId;
    return connection;
  }

  static async getConnectionDumps(connectionId: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);

    const dumpNames = (await fsp.readdir(connectionPath))
      .filter((file) => file.endsWith(".dump"))
      .reverse();

    const loadFileContent = async (dumpPath: string) => {
      const stats = await fsp.stat(dumpPath);

      if (!stats.isFile()) {
        throw new Error("Invalid dump file");
      }

      return {
        name: path.basename(dumpPath),
        size: prettyBytes(stats.size),
        createdAt: stats.birthtime,
      };
    };

    return Promise.all(
      dumpNames.map((dumpName: string) => {
        return loadFileContent(path.join(connectionPath, dumpName));
      })
    );
  }

  static async downloadConnectionDump(connectionId: string, dump: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);

    const buffer = await fsp.readFile(path.join(connectionPath, dump));

    const headers = new Headers();

    headers.append("Content-Disposition", `attachment; filename=${dump}`);
    headers.append("Content-Type", "application/octet-stream");

    return new Response(buffer, { headers });
  }

  static deleteConnection(connectionId: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);

    return fsp.rmdir(connectionPath, { recursive: true });
  }

  static async deleteConnectionDump(connectionId: string, dump: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);

    await fsp.unlink(path.join(connectionPath, dump));
  }
}

export { ConnectionStorage };
