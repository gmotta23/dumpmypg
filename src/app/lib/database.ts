import { mkdirSync, writeFileSync } from "fs";
import { Connection } from "./definitions";
import { generateUUID } from "./utils";
import path from "path";

class ConnectionStorage {
  static createConnection(connection: Connection) {
    const uuid = generateUUID();

    const connectionPath = path.join(process.cwd(), "data", uuid);

    mkdirSync(connectionPath);

    writeFileSync(
      path.join(connectionPath, "connection.json"),
      JSON.stringify(connection)
    );
  }

  static getConnections() {}

  static deleteConnection(connectionId: string) {}

  static getConnectionDumps(connectionId: string) {}

  static createConnectionDump(connectionId: string) {}

  static downloadConnectionDump(connectionId: string, dump: string) {}

  static deleteConnectionDump(connectionId: string, dump: string) {}
}

export { ConnectionStorage };
