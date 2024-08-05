import Link from "next/link";
import { ConnectionList } from "./ui/connections/connection-list";
import Section from "./ui/display/section";
import { Button } from "./ui/button";
import Title from "./ui/display/title";

export default function Home() {
  return (
    <Section>
      <div className="grid">
        <div className="flex items-center justify-between">
          <Title title="Connections" />
          <Link href="/connections/create">
            <Button>Create new connection</Button>
          </Link>
        </div>
        <ConnectionList />
      </div>
    </Section>
  );
}
