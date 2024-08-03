import { getConnections } from "@/lib/actions";
import Link from "next/link";

export async function ConnectionList() {
  const connections = await getConnections();
  return (
    <div className="bg-white mx-10 shadow overflow-hidden sm:rounded-md">
      <ul>
        <li className="border-t border-gray-200">
          <div className="grid grid-cols-5 gap-4 px-4 py-4 sm:px-6 font-bold">
            <div className="text-sm leading-5 text-blue-500 truncate">Name</div>
            <div className="text-sm leading-5 text-blue-500 truncate">Host</div>
            <div className="text-sm leading-5 text-blue-500 truncate">Port</div>
            <div className="text-sm leading-5 text-blue-500 truncate">
              Database
            </div>
            <div className="text-sm leading-5 text-blue-500 truncate">
              Action
            </div>
          </div>
        </li>
        {connections.map((db, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-4 py-4 sm:px-6">
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
                <Link href={`/connections/${db.id}`}>
                  <div className="text-blue-500 hover:text-indigo-900">
                    View
                  </div>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
