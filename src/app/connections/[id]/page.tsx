import { getConnection, getConnectionDumps } from "@/app/lib/actions";
import { DumpButton } from "@/app/ui/connections/connection/dump-button";
import { DumpList } from "@/app/ui/connections/connection/dump-list";
import Section from "@/app/ui/display/section";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const connection = await getConnection(id);
  const connectionDumps = await getConnectionDumps(id);

  console.log(connectionDumps);

  return (
    <Section title="Connection">
      <div className="text-center">
        <p className="text-xl mb-4">ID: {id}</p>
        <p className="text-xl mb-4">Name: {connection.name}</p>
        <p className="text-xl mb-4">Host: {connection.host}</p>
        <p className="text-xl mb-4">Port: {connection.port}</p>
        <DumpList dumps={connectionDumps} />
        <DumpButton connection={connection} />
        <Link href="/">
          <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go Back
          </div>
        </Link>
      </div>
    </Section>
  );
}
