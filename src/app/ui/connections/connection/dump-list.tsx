import { TrashIcon } from "@heroicons/react/24/solid";
import { ListContainer } from "../../list-container";
import { DownloadButton } from "./download-button";
import { Connection } from "@/lib/definitions";

export function DumpList({
  connection,
  dumps,
}: {
  connection: Partial<Connection>;
  dumps: string[];
}) {
  return (
    <ListContainer>
      <ul>
        <li className="border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 px-4 py-4 sm:px-6 font-bold">
            <div className="text-sm leading text-blue-500 truncate">Dump</div>
            <div className="text-sm leading text-blue-500 truncate">
              Actions
            </div>
          </div>
        </li>
        {dumps.map((dump, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {dump}
              </div>
              <div className="flex gap-3 text-sm leading-5 font-medium text-blue-500 truncate">
                <DownloadButton connection={connection} dump={dump} />
                <TrashIcon className="h-6 w-6 cursor-pointer" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}
