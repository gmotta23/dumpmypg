import { ConnectionStorage } from "@/lib/connection";

export async function POST(
  _request: Request,
  { params }: { params: { connectionId: string; dump: string } }
) {
  const { connectionId, dump } = params;
  return ConnectionStorage.downloadConnectionDump(connectionId, dump);
}
