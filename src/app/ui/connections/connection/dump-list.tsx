import { ListContainer } from "../../list-container";
import { DownloadButton } from "./download-button";
import { Connection, Dump } from "@/lib/definitions";
import { DeleteDumpButton } from "./delete-dump-button";

export function DumpList({
  connection,
  dumps,
  onDelete,
}: {
  connection: Partial<Connection>;
  dumps: Dump[];
  onDelete: () => void;
}) {
  return (
    <ListContainer className="h-[calc(100vh_-_20rem)]">
      <ul>
        <li className="border-t border-gray-200">
          <div className="grid grid-cols-4 gap-4 px-4 py-4 sm:px-6 font-bold">
            <div className="text-sm leading text-blue-500 truncate">Dump</div>
            <div className="text-sm leading text-blue-500 truncate">
              Creation date
            </div>
            <div className="text-sm leading text-blue-500 truncate">Size</div>
            <div className="text-sm leading text-blue-500 truncate">
              Actions
            </div>
          </div>
        </li>
        {dumps.map((dump, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {dump.name}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {dump.createdAt.toString()}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {dump.size}
              </div>
              <div className="flex gap-3 text-sm leading-5 font-medium text-blue-500 truncate">
                <DownloadButton connection={connection} dump={dump.name} />
                <DeleteDumpButton
                  connection={connection}
                  dump={dump.name}
                  onDelete={onDelete}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}
