"use client";
import { dump } from "@/lib/actions";
import { Connection } from "@/lib/definitions";
import { Button } from "../../button";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const result = await dump(connection.id);

        if (!result.success) {
          toast(result.message, { type: "error" });
        } else {
          toast("Dumped successfully", { type: "success" });
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      if (onDump) {
        onDump();
      }
    }
  };

  return (
    <Button disabled={!connection} onClick={handleDump}>
      {loading ? "Loading" : "Dump"}
    </Button>
  );
};
