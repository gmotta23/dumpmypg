import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="flex space-x-10 container px-10">
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">DumpMyPG</h1>
        </Link>
        <Link href="/">
          <h1 className="text-white text-2xl font-bold">About</h1>
        </Link>
      </div>
    </header>
  );
};
