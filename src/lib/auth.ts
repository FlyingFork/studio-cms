import { betterAuth } from "better-auth";
import { admin as adminPlugin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { ac, admin, owner, designer } from "@/lib/permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {
    additionalFields: {
      mustChangePassword: {
        type: "boolean",
        input: false,
        defaultValue: true,
      },
      lastLoginAt: {
        type: "date",
        input: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Studio CMS password",
        html: `<p>Click to reset your password:</p><p><a href="${url}">${url}</a></p>`,
      });
    },
  },

  plugins: [
    adminPlugin({
      ac,
      roles: { admin, owner, designer },
      defaultRole: "owner",
      adminRoles: ["admin", "owner"],
    }),
  ],

  trustedOrigins: [process.env.BETTER_AUTH_URL!],

  rateLimit: {
    enabled: true,
    storage: "database",
    modelName: "rateLimit",
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/forget-password": { window: 60, max: 3 },
      "/reset-password": { window: 60, max: 5 },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const existingAdmin = await prisma.user.findFirst({
          where: { role: "admin" },
        });
        if (existingAdmin) {
          throw new APIError("FORBIDDEN", {
            message: "Public sign-up is disabled.",
          });
        }
      }
    }),
  },
});
