import type { Metadata } from "next";
import { SurveyForm } from "./survey-form";

type SurveyState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: SurveyState = { status: "idle", message: "" };

export const metadata: Metadata = {
  title: "Survey",
  description: "Send a quick note to Roshi.",
};

async function sendSurvey(
  _prevState: SurveyState,
  formData: FormData,
): Promise<SurveyState> {
  "use server";

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return { status: "error", message: "Server is missing the bot token." };
  }

  const rawMessage = formData.get("message");
  const text = typeof rawMessage === "string" ? rawMessage.trim() : "";

  if (!text) {
    return { status: "error", message: "Please enter a message." };
  }

  if (text.length > 500) {
    return { status: "error", message: "Message is too long (max 500)." };
  }

  try {
    const curatedMessage = `New survey note\n\n${text}\n\n— roshi.ink/survey`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 5076971567,
          text: curatedMessage,
        }),
      },
    );

    let payload: { ok?: boolean; description?: string } | null = null;
    try {
      payload = (await response.json()) as { ok?: boolean; description?: string };
    } catch {
      payload = null;
    }

    if (!response.ok || payload?.ok === false) {
      const details = payload?.description
        ? `Telegram rejected the message: ${payload.description}`
        : "Telegram rejected the message.";
      return { status: "error", message: details };
    }

    return { status: "success", message: "Sent. Thank you." };
  } catch (error) {
    return { status: "error", message: "Network error. Try again." };
  }
}

export default function SurveyPage() {
  return (
    <main className="container survey" role="main">
      <section className="survey-panel" aria-label="Survey">
        <h1>Leave a note</h1>
        <p className="muted">A single sentence is perfect.</p>
        <SurveyForm action={sendSurvey} initialState={initialState} />
      </section>
    </main>
  );
}
