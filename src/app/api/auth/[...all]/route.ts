import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

type AuthHandlers = ReturnType<typeof toNextJsHandler>;
let handlers: AuthHandlers | undefined;

function getHandlers() {
  handlers ??= toNextJsHandler(getAuth());
  return handlers;
}

export function GET(request: NextRequest) {
  return getHandlers().GET(request);
}

export function POST(request: NextRequest) {
  return getHandlers().POST(request);
}
