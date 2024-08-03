"use client";
import { downloadConnectionDump } from "@/app/lib/actions";
import { Connection } from "@/app/lib/definitions";
import { Button } from "../../button";
import { useState } from "react";

export const DownloadButton = ({
  connection,
  dump,
}: {
  connection: Connection;
  dump: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (connection && connection.id && dump) {
        await downloadConnectionDump(connection.id, dump);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={!connection} onClick={handleDownload}>
      {loading ? "Loading" : "Download"}
    </Button>
  );
};
