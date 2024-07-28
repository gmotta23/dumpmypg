"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { dump } from "./lib/actions";

export default function Home() {
  return (
    <>
      <Link href="/databases/create">New database connection</Link>
      <h1>Hello from dump my pg!</h1>
      <Button
        onClick={async (e) => {
          // await dump();
        }}
      >
        Hello
      </Button>
    </>
  );
}
