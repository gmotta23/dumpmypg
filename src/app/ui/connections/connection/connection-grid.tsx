import clsx from "clsx";
import { Connection } from "@/lib/definitions";

export const ConnectionGrid = ({
  connection,
}: {
  connection: Partial<Connection>;
}) => {
  const GridCell = ({ name, value }: { name: string; value: string }) => {
    return (
      <div className="grid bg-gray-800 border border-white p-4 text-white">
        <div className={clsx("justify-self-start text-sm font-bold")}>
          {name}
        </div>
        <div className={clsx("justify-self-end")}>{value}</div>
      </div>
    );
  };

  return (
    <div className="grid pb-4">
      <div className="grid grid-cols-[50%_10%_40%]">
        <GridCell name="Host" value={connection.host ?? ""} />
        <GridCell name="Port" value={connection.port?.toString() ?? ""} />
        <GridCell name="Database" value={connection.database ?? ""} />
      </div>
    </div>
  );
};
