"use client";
import Link from "next/link";
import { ConnectionList } from "./ui/connections/connection-list";
import Section from "./ui/display/section";
import { Button } from "./ui/button";
import Title from "./ui/display/title";
import { useEffect, useState } from "react";
import { Connection } from "@/lib/definitions";
import { getConnections } from "@/lib/actions";

export default function Home() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const connections = await getConnections();
      setConnections(connections);
    }
    fetchData();
  }, [refresh]);

  return (
    <Section>
      <div className="grid pb-10">
        <div className="flex items-center justify-between">
          <Title title="Connections" />
          <Link href="/connections/create">
            <Button>Create new connection</Button>
          </Link>
        </div>
        <ConnectionList
          connections={connections}
          onDelete={() => setRefresh(!refresh)}
        />
      </div>
    </Section>
  );
}
