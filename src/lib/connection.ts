import fs from "fs";
import { Connection } from "./definitions";
import { generateUUID } from "./utils";
import path from "path";

const fsp = fs.promises;

class ConnectionStorage {
  static connectionFile = "connection.json";
  static async createConnection(connection: Connection) {
    const uuid = generateUUID();

    const connectionPath = path.join(process.cwd(), "data", uuid);

    await fsp.mkdir(connectionPath);

    await fsp.writeFile(
      path.join(connectionPath, this.connectionFile),
      JSON.stringify(connection)
    );
  }

  static async getConnections() {
    const connectionsPath = path.join(process.cwd(), "data");

    const directories = await fsp.readdir(connectionsPath);

    const connections = [];

    for (const connectionId of directories) {
      const connection = await this.getConnection(connectionId);
      connections.push(connection);
    }

    return connections;
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
    );
    if (options.hidePassword) {
      delete connection.password;
    }
    connection.id = connectionId;
    return connection;
  }

  static async getConnectionDumps(connectionId: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);

    const dumps = (await fsp.readdir(connectionPath)).filter((file) =>
      file.endsWith(".dump")
    );

    return dumps;
  }

  static async downloadConnectionDump(connectionId: string, dump: string) {
    const connectionPath = path.join(process.cwd(), "data", connectionId);

    const buffer = await fsp.readFile(path.join(connectionPath, dump));

    const headers = new Headers();

    headers.append("Content-Disposition", `attachment; filename=${dump}`);
    headers.append("Content-Type", "application/octet-stream");

    return new Response(buffer, { headers });
  }

  static deleteConnection(connectionId: string) {}

  static deleteConnectionDump(connectionId: string, dump: string) {}
}

export { ConnectionStorage };
