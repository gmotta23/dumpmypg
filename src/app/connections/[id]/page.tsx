"use client";
import { getConnection, getConnectionDumps } from "@/lib/actions";
import { DumpButton } from "@/app/ui/connections/connection/dump-button";
import { DumpList } from "@/app/ui/connections/connection/dump-list";
import Section from "@/app/ui/display/section";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ConnectionGrid } from "@/app/ui/connections/connection/connection-grid";
import Title from "@/app/ui/display/title";
import { Button } from "@/app/ui/button";
import { Dump } from "@/lib/definitions";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [refresh, setRefresh] = useState(false);
  const [connection, setConnection] = useState({
    name: "",
    host: "",
    port: undefined,
    database: "",
    user: "",
  });
  const [connectionDumps, setConnectionDumps] = useState<Dump[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [connection, connectionDumps] = await Promise.all([
        getConnection(id),
        getConnectionDumps(id),
      ]);

      console.log(connectionDumps);
      setConnection(connection);
      setConnectionDumps(connectionDumps);
    }
    fetchData();
  }, [id, refresh]);

  return (
    <Section>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Title title={`Connection ${connection.name}`} />
        </div>
        <div className="flex gap-3">
          <DumpButton
            connection={connection}
            onDump={() => setRefresh(!refresh)}
          />
          <Link href="/">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <ConnectionGrid connection={connection} />
        <DumpList connection={connection} dumps={connectionDumps} />
      </div>
    </Section>
  );
}
