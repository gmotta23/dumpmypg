"use client";
import Link from "next/link";
import { ConnectionList } from "./ui/connections/connection-list";
import Section from "./ui/display/section";

export default function Home() {
  return (
    <Section title="Connections">
      <ConnectionList />
      <Link href="/connections/create">
        <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Create new connection
        </div>
      </Link>
    </Section>
  );
}
