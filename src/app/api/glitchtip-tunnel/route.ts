import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const envelope = await req.text();

  const dsn = new URL(process.env.GLITCHTIP_DSN!);
  const projectId = dsn.pathname.replace("/", "");
  const url = `${dsn.protocol}//${dsn.host}/api/${projectId}/envelope/`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: envelope,
  });

  if (!response.ok) {
    return NextResponse.json({ status: "error" }, { status: response.status });
  }

  return NextResponse.json({ status: "ok" });
}
