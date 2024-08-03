import Link from "next/link";
import { Button } from "../../button";
import { DownloadButton } from "./download-button";
import { Connection } from "@/lib/definitions";

export async function DumpList({
  connection,
  dumps,
}: {
  connection: Connection;
  dumps: string[];
}) {
  return (
    <div className="bg-white mx-10 shadow overflow-hidden sm:rounded-md">
      <ul>
        <li className="border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 px-4 py-4 sm:px-6 font-bold">
            <div className="text-sm leading text-blue-500 truncate">Dump</div>
            <div className="text-sm leading text-blue-500 truncate">
              Download
            </div>
          </div>
        </li>
        {dumps.map((dump, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {dump}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                <DownloadButton connection={connection} dump={dump} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
