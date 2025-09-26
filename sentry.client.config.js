import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://ac6450fb3d2e35ee8a4a583c8130d7e7@o4509177285902336.ingest.de.sentry.io/4510084669374544",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});
