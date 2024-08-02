"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ConnectionList } from "./ui/databases/connection-list";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl mb-4 font-bold text-gray-700">Connections</h1>
        <ConnectionList />
        <Link href="/connections/create">
          <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Create new connection
          </div>
        </Link>
      </div>
    </section>
  );
}
