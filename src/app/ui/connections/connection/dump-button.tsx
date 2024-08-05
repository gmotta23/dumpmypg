"use client";
import { dump } from "@/lib/actions";
import { Connection } from "@/lib/definitions";
import { Button } from "../../button";
import { useState } from "react";

export const DumpButton = ({
  connection,
  onDump,
}: {
  connection: Partial<Connection>;
  onDump: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDump = async () => {
    setLoading(true);
    try {
      if (connection && connection.id) {
        await dump(connection.id);
        if (onDump) {
          onDump();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={!connection} onClick={handleDump}>
      {loading ? "Loading" : "Dump"}
    </Button>
  );
};
