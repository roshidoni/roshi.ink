import posthog from "posthog-js";

const initPosthog = () => {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    return;
  }

  posthog.init(key, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
};

const scheduleInit = () => {
  if (typeof window === "undefined") {
    return;
  }

  const runInit = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initPosthog);
      return;
    }

    setTimeout(initPosthog, 0);
  };

  if (document.readyState === "complete") {
    runInit();
  } else {
    window.addEventListener("load", runInit, { once: true });
  }
};

scheduleInit();
