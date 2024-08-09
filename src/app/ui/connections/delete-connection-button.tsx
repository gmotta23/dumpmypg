"use client";
import { Connection } from "@/lib/definitions";
import { useState } from "react";
import { deleteConnection } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";

export const DeleteConnectionButton = ({
  connectionId,
  onDelete,
}: {
  connectionId: string;
  onDelete: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteConnection = async () => {
    setLoading(true);

    try {
      if (connectionId) {
        await deleteConnection(connectionId);
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
      onClick={handleDeleteConnection}
      aria-disabled={loading}
      className="h-6 w-6 cursor-pointer"
    />
  );
};
