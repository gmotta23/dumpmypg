"use client";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch the connection data based on the ID here
  // For now, we'll just display the ID

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl mb-4 font-bold text-gray-700">
          Connection Page
        </h1>
        <p className="text-xl mb-4">Connection ID: {id}</p>
        <Link href="/">
          <div className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go Back
          </div>
        </Link>
      </div>
    </section>
  );
}
