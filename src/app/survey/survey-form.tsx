"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type SurveyState = {
  status: "idle" | "success" | "error";
  message: string;
};

type SurveyFormProps = {
  action: (prevState: SurveyState, formData: FormData) => Promise<SurveyState>;
  initialState: SurveyState;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="survey-button" type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

export function SurveyForm({ action, initialState }: SurveyFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form className="survey-form" action={formAction}>
      <label className="sr-only" htmlFor="survey-message">
        Message
      </label>
      <input
        id="survey-message"
        name="message"
        type="text"
        className="survey-input"
        placeholder="Type your message"
        maxLength={500}
        required
      />
      <SubmitButton />
      {state.message ? (
        <p
          className={`survey-status ${state.status === "error" ? "is-error" : ""}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
