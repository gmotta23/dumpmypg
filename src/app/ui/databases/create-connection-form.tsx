"use client";
import { FormState, createConnection } from "@/app/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "../button";

export default function Form() {
  const initialState: FormState = { message: null };
  const [state, formAction] = useFormState(createConnection, initialState);

  return (
    <form action={formAction}>
      <div className="bg-gray-50 p-4 md:p-6">
        <div className="mb-4 flex items-center">
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
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            htmlFor="port"
            className="text-left mb-2 text-sm font-medium w-32"
          >
            Port
          </label>
          <input
            id="port"
            name="port"
            type="text"
            placeholder="Port"
            className="cursor-pointer rounded-md border border-gray-200 py-2 ml-3 pl-3 text-sm outline-2 placeholder:text-gray-500 flex-1"
          />
        </div>
        <div className="mb-4 flex items-center">
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
          />
        </div>
        <div className="mb-4 flex items-center">
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
          />
        </div>
        <div className="mb-4 flex items-center">
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
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/databases"
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
