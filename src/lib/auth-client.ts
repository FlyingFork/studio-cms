import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { ac, admin, owner, designer } from "@/lib/permissions";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: { admin, owner, designer },
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const { signIn, signOut, useSession } = authClient;
