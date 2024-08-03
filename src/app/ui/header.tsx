import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">DumpMyPG</h1>
        </Link>
      </div>
    </header>
  );
};
