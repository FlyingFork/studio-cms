import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.GLITCHTIP_DSN,
    tracesSampleRate: 0.1,
  });
}
