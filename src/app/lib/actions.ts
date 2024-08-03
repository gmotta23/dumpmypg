"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Credentials, Dumper } from "./dumper";
import { ConnectionStorage } from "./connection";

export type FormState = {
  message?: string | null;
};

const ConnectionSchema = z.object({
  name: z.string(),
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
  ssl: z.boolean(),
});

export async function createConnection(
  _prevState: FormState,
  formData: FormData
) {
  const validatedFields = ConnectionSchema.safeParse({
    name: formData.get("name"),
    host: formData.get("host"),
    port: formData.get("port"),
    database: formData.get("database"),
    user: formData.get("user"),
    password: formData.get("password"),
    ssl: formData.get("ssl"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing fields",
    };
  }

  await ConnectionStorage.createConnection(validatedFields.data);

  revalidatePath("/");
  redirect("/");
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
  new Dumper(credentials, connectionId, { ssl: connection.ssl }).dump();
}

export async function getConnectionDumps(connectionId: string) {
  return await ConnectionStorage.getConnectionDumps(connectionId).catch((_) => {
    throw new Error("Failed to fetch connection dumps.");
  });
}
