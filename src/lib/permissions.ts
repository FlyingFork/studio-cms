import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  project: [
    "create",
    "editOwn",
    "editAny",
    "publish",
    "restoreLive",
    "restoreOwn",
    "deleteOwn",
    "deleteAny",
  ],
  media: ["upload", "deleteOwn", "deleteAny"],
  settings: ["edit"],
  users: ["invite", "changeRole", "deactivate"],
  auditLog: ["read"],
  platform: ["switchMode", "changeStorage"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  project: [
    "create",
    "editOwn",
    "editAny",
    "publish",
    "restoreLive",
    "restoreOwn",
    "deleteOwn",
    "deleteAny",
  ],
  media: ["upload", "deleteOwn", "deleteAny"],
  settings: ["edit"],
  users: ["invite", "changeRole", "deactivate"],
  auditLog: ["read"],
  platform: ["switchMode", "changeStorage"],
});

export const owner = ac.newRole({
  ...adminAc.statements,
  project: [
    "create",
    "editOwn",
    "editAny",
    "publish",
    "restoreLive",
    "restoreOwn",
    "deleteOwn",
    "deleteAny",
  ],
  media: ["upload", "deleteOwn", "deleteAny"],
  settings: ["edit"],
  users: ["invite", "changeRole", "deactivate"],
  auditLog: ["read"],
  platform: [],
});

export const designer = ac.newRole({
  project: ["create", "editOwn", "restoreOwn", "deleteOwn"],
  media: ["upload", "deleteOwn"],
  settings: [],
  users: [],
  auditLog: [],
  platform: [],
});
