import { dump, getConnection } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import Section from "@/app/ui/display/section";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const connection = await getConnection(id);

  return (
    <Section title="Connection">
      <div className="text-center">
        <p className="text-xl mb-4">ID: {id}</p>
        <p className="text-xl mb-4">Name: {connection.name}</p>
        <p className="text-xl mb-4">Host: {connection.host}</p>
        <p className="text-xl mb-4">Port: {connection.port}</p>
        {/* <Button onClick={dump(connection.id)}>New dump</Button> */}
        <Link href="/">
          <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go Back
          </div>
        </Link>
      </div>
    </Section>
  );
}
