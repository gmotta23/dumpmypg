"use client";
import { Connection } from "@/lib/definitions";
import { Button } from "../../button";
import { useState } from "react";

export const DownloadButton = ({
  connection,
  dump,
}: {
  connection: Partial<Connection>;
  dump: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (connection && connection.id && dump) {
        const response = await fetch(`/api/dump/${connection.id}/${dump}`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to download dump");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = dump;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
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
