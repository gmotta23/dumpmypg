import Link from "next/link";

const databases = [
  { host: "localhost", port: 5432, database: "db1" },
  { host: "localhost", port: 5432, database: "db2" },
  { host: "localhost", port: 5432, database: "db3" },
  { host: "localhost", port: 5432, database: "db4" },
  { host: "localhost", port: 5432, database: "db5" },
];

export function ConnectionList() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul>
        {databases.map((db, index) => (
          <li key={index} className="border-t border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-4 py-4 sm:px-6">
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                {db.host}
              </div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                {db.port}
              </div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                {db.database}
              </div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                {db.host}:{db.port}/{db.database}
              </div>
              <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                <Link href={`/connections/${index}`}>
                  <div className="text-indigo-600 hover:text-indigo-900">
                    View Connection
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
