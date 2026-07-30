import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_GLITCHTIP_DSN,
    tracesSampleRate: 0.1,
  });
}

export const onRouterTransitionStart =
  process.env.NODE_ENV === "production" ? Sentry.captureRouterTransitionStart : undefined;
