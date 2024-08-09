"use server";
import { z } from "zod";
import { Dumper } from "./dumper";
import { ConnectionStorage } from "./connection";

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};

const ConnectionSchema = z.object({
  name: z.string().trim(),
  host: z.string().trim().min(1, { message: "Host cannot be empty" }),
  port: z.number().min(1, { message: "Port cannot be empty" }),
  database: z.string().trim().min(1, { message: "Database cannot be empty" }),
  user: z.string().trim().min(1, { message: "User cannot be empty" }),
  password: z.string().trim().min(1, { message: "Password cannot be empty" }),
  ssl: z.boolean(),
});

export async function createConnection(
  _prevState: FormState,
  formData: FormData
) {
  const validatedFields = ConnectionSchema.safeParse({
    name: formData.get("name"),
    host: formData.get("host"),
    port: parseInt((formData.get("port") as string) ?? "0"),
    database: formData.get("database"),
    user: formData.get("user"),
    password: formData.get("password"),
    ssl: formData.get("ssl") === "on",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
      success: false,
    };
  }

  await ConnectionStorage.createConnection(validatedFields.data);

  return { success: true };
}

export async function getConnections() {
  return await ConnectionStorage.getConnections().catch((_) => {
    throw new Error("Failed to fetch connection files.");
  });
}

export async function getConnection(connectionId: string) {
  return await ConnectionStorage.getConnection(connectionId).catch((_) => {
    throw new Error("Failed to fetch connection data.");
  });
}

export async function dump(connectionId: string) {
  const connection = await ConnectionStorage.getConnection(connectionId, {
    hidePassword: false,
  });
  const credentials = {
    host: connection.host,
    port: connection.port,
    database: connection.database,
    user: connection.user,
    password: connection.password,
  };

  try {
    await new Dumper(credentials, connectionId, {
      ssl: connection.ssl,
    }).dump();

    return { success: true, message: "Dumped successfully" };
  } catch (error: unknown) {
    return { success: false, message: (error as Error).message };
  }
}

export async function getConnectionDumps(connectionId: string) {
  return await ConnectionStorage.getConnectionDumps(connectionId).catch((_) => {
    throw new Error("Failed to fetch connection dumps.");
  });
}

export async function deleteConnectionDump(connectionId: string, dump: string) {
  return await ConnectionStorage.deleteConnectionDump(connectionId, dump).catch(
    (_) => {
      console.log(_);
      throw new Error("Failed to delete connection dump.");
    }
  );
}

export async function deleteConnection(connectionId: string) {
  return await ConnectionStorage.deleteConnection(connectionId).catch((_) => {
    throw new Error("Failed to delete connection.");
  });
}
