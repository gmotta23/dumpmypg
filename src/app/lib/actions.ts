"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState = {
  message?: string | null;
};

const ConnectionSchema = z.object({
  id: z.string(),
  host: z.string(),
  port: z.string(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
});

const CreateConnectionSchema = ConnectionSchema.omit({ id: true });

export async function createConnection(
  prevState: FormState,
  formData: FormData
) {
  const validatedFields = CreateConnectionSchema.safeParse({
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

  const { host, port, database, user, password } = validatedFields.data;

  revalidatePath("/databases");
  redirect("/databases");
}
