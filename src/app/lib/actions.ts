"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Credentials, Dumper } from "./dumper";
import { ConnectionStorage } from "./database";

export type FormState = {
  message?: string | null;
};

const ConnectionSchema = z.object({
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
});

export async function createConnection(
  _prevState: FormState,
  formData: FormData
) {
  const validatedFields = ConnectionSchema.safeParse({
    host: formData.get("host"),
    port: formData.get("port"),
    database: formData.get("database"),
    user: formData.get("user"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing fields",
    };
  }

  ConnectionStorage.createConnection(validatedFields.data);

  revalidatePath("/");
  redirect("/");
}

export async function dump(credentials: Credentials) {
  new Dumper(credentials, { ssl: true }).dump();
}
