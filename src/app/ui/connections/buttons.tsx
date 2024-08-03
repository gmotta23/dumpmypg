import Link from "next/link";

export function CreateConnection() {
  return (
    <Link href="/databases/create">
      <span className="hidden md:block">New database</span>
    </Link>
  );
}
