"use client";
import { dump } from "@/lib/actions";
import { Connection } from "@/lib/definitions";
import { Button } from "../../button";
import { useState } from "react";

export const DumpButton = ({ connection }: { connection: Connection }) => {
  const [loading, setLoading] = useState(false);

  const handleDump = async () => {
    setLoading(true);
    try {
      if (connection && connection.id) {
        await dump(connection.id);
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
