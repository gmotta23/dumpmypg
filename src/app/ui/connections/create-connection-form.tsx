"use client";
import { FormState, createConnection } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "../button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { formatScript } from "@/lib/utils";
import { Connection } from "@/lib/definitions";

const PreviewScript = ({ previewScript }: { previewScript: string }) => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="">
        <div className="grid gap-4 text-white">
          <div className="text-md font-bold">Dump Command Preview</div>
          <div className="text-sm">
            {previewScript.length
              ? `Command: ${previewScript}`
              : "Not enough data"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Form() {
  const initialState: FormState = { message: null, errors: {}, success: false };

  const [state, formAction] = useFormState(createConnection, initialState);
  const [previewConnection, setPreviewConnection] = useState<
    Partial<Connection>
  >({
    host: "",
    port: undefined,
    database: "",
    user: "",
    password: "",
    ssl: false,
  });
  const [previewScript, setPreviewScript] = useState("");

  const notify = () => toast("Connection created successfully!");

  useEffect(() => {
    const noEmptyFields = Object.values(previewConnection).every(
      (v) => v !== ""
    );

    if (noEmptyFields) {
      setPreviewScript(formatScript(previewConnection, true));
    } else {
      setPreviewScript("");
    }
  }, [previewConnection]);

  useEffect(() => {
    if (state.success) {
      notify();
      redirect("/");
    }
  }, [state.success]);

  return (
    <form action={formAction}>
      <PreviewScript previewScript={previewScript} />
      <div className="bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="name"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
            />
          </div>
          <div className="pt-2">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="host"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              Host
            </label>
            <input
              id="host"
              name="host"
              type="text"
              placeholder="Host"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
              onChange={(e) =>
                setPreviewConnection({
                  ...previewConnection,
                  host: e.target.value,
                })
              }
            />
          </div>
          <div className="pt-2">
            {state.errors?.host &&
              state.errors.host.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="port"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              Port
            </label>
            <input
              id="port"
              name="port"
              type="number"
              placeholder="Port"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
              onChange={(e) =>
                setPreviewConnection({
                  ...previewConnection,
                  port: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="pt-2">
            {state.errors?.port &&
              state.errors.port.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="database"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              Database
            </label>
            <input
              id="database"
              name="database"
              type="text"
              placeholder="Database"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
              onChange={(e) =>
                setPreviewConnection({
                  ...previewConnection,
                  database: e.target.value,
                })
              }
            />
          </div>
          <div className="pt-2">
            {state.errors?.database &&
              state.errors.database.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="user"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              User
            </label>
            <input
              id="user"
              name="user"
              type="text"
              placeholder="User"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
              onChange={(e) =>
                setPreviewConnection({
                  ...previewConnection,
                  user: e.target.value,
                })
              }
            />
          </div>
          <div className="pt-2">
            {state.errors?.user &&
              state.errors.user.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
              onChange={(e) =>
                setPreviewConnection({
                  ...previewConnection,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="pt-2">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="ssl"
              className="text-left mb-2 text-sm font-medium w-32"
            >
              Requires SSL
            </label>
            <input
              id="ssl"
              name="ssl"
              type="checkbox"
              className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500"
              onChange={(e) =>
                setPreviewConnection({
                  ...previewConnection,
                  ssl: e.target.checked,
                })
              }
            />
          </div>
          <div className="pt-2">
            {state.errors?.ssl &&
              state.errors.ssl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/connections"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Connection</Button>
        </div>
      </div>
    </form>
  );
}
