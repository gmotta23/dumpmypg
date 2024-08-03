"use client";
import Section from "@/app/ui/display/section";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch the connection data based on the ID here
  // For now, we'll just display the ID

  return (
    <Section title="Connection">
      <div className="text-center">
        <p className="text-xl mb-4">ID: {id}</p>
        <Link href="/">
          <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go Back
          </div>
        </Link>
      </div>
    </Section>
  );
}
