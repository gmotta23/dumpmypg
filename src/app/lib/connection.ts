import fs, { readFile } from "fs";
import { mkdirSync, readdirSync, writeFileSync } from "fs";
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

    for (const d of directories) {
      const connectionPath = path.join(
        process.cwd(),
        "data",
        d,
        this.connectionFile
      );
      const connection = await fsp.readFile(connectionPath);
      connections.push(JSON.parse(connection.toString()));
    }

    return connections;
  }

  static deleteConnection(connectionId: string) {}

  static getConnectionDumps(connectionId: string) {}

  static createConnectionDump(connectionId: string) {}

  static downloadConnectionDump(connectionId: string, dump: string) {}

  static deleteConnectionDump(connectionId: string, dump: string) {}
}

export { ConnectionStorage };
