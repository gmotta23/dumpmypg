"use client";
import { getConnection, getConnectionDumps } from "@/lib/actions";
import { DumpButton } from "@/app/ui/connections/connection/dump-button";
import { DumpList } from "@/app/ui/connections/connection/dump-list";
import Section from "@/app/ui/display/section";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [refresh, setRefresh] = useState(false);
  const [connection, setConnection] = useState({
    name: "",
    host: "",
    port: "",
    database: "",
    user: "",
  });
  const [connectionDumps, setConnectionDumps] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [connection, connectionDumps] = await Promise.all([
        getConnection(id),
        getConnectionDumps(id),
      ]);
      setConnection(connection);
      setConnectionDumps(connectionDumps);
    }
    fetchData();
  }, [id, refresh]);

  return (
    <Section title="Connection">
      <div className="text-center">
        <p className="text-xl mb-4">ID: {id}</p>
        <p className="text-xl mb-4">Name: {connection.name}</p>
        <p className="text-xl mb-4">Host: {connection.host}</p>
        <p className="text-xl mb-4">Port: {connection.port}</p>
        <DumpList connection={connection} dumps={connectionDumps} />
        <DumpButton
          connection={connection}
          onDump={() => setRefresh(!refresh)}
        />
        <Link href="/">
          <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go Back
          </div>
        </Link>
      </div>
    </Section>
  );
}
