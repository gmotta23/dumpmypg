import { getConnections } from "@/lib/actions";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  NoSymbolIcon,
  CheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

export async function ConnectionList() {
  const connections = await getConnections();
  return (
    <div className="text-left bg-white shadow overflow-hidden sm:rounded-md w-[calc(100vw_-_10rem)]">
      <ul>
        <li className="border-t border-gray-200">
          <div className="grid grid-cols-[20%_30%_10%_15%_10%_15%] gap-4 px-4 py-4 sm:px-6 font-bold">
            <div className="text-md leading-5 text-blue-500 truncate">Name</div>
            <div className="text-md leading-5 text-blue-500 truncate">Host</div>
            <div className="text-md leading-5 text-blue-500 truncate">Port</div>
            <div className="text-md leading-5 text-blue-500 truncate">
              Database
            </div>
            <div className="text-md leading-5 text-blue-500 truncate">SSL</div>

            <div className="text-md leading-5 text-blue-500 truncate">
              Actions
            </div>
          </div>
        </li>
        {connections.map((db, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid grid-cols-[20%_30%_10%_15%_10%_15%] gap-4 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {db.name ?? `${db.host}:${db.port}/${db.database}`}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {db.host}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {db.port}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {db.database}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                {db.ssl ? (
                  <CheckBadgeIcon className="h-6 w-6" />
                ) : (
                  <NoSymbolIcon className="h-6 w-6" />
                )}
              </div>
              <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                <div className="flex justify-start gap-x-8">
                  <Link href={`/connections/${db.id}`}>
                    <ArrowTopRightOnSquareIcon className="h-6 w-6" />
                  </Link>
                  <TrashIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
