import { getConnections } from "@/app/lib/actions";
import Link from "next/link";

export async function DumpList({ dumps }: { dumps: string[] }) {
  return (
    <div className="bg-white mx-10 shadow overflow-hidden sm:rounded-md">
      <ul>
        <li className="border-t border-gray-200">
          <div className="gap-4 px-4 py-4 sm:px-6 font-bold">
            <div className="text-sm leading text-blue-500 truncate">Dumps</div>
          </div>
        </li>
        {dumps.map((dump, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid gap-4 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {dump}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
