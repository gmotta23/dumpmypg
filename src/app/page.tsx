import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/databases/create">New database connection</Link>
      <h1>Hello from dump my pg!</h1>
    </>
  );
}
