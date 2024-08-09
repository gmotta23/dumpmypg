"use client";
import { Connection } from "@/lib/definitions";
import { useState } from "react";
import { deleteConnectionDump } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";

export const DeleteDumpButton = ({
  connection,
  dump,
  onDelete,
}: {
  connection: Partial<Connection>;
  dump: string;
  onDelete: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteDump = async () => {
    setLoading(true);

    try {
      if (connection && connection.id && dump) {
        await deleteConnectionDump(connection.id, dump);
      }
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TrashIcon
      onClick={handleDeleteDump}
      aria-disabled={loading}
      className="h-6 w-6 cursor-pointer"
    />
  );
};
