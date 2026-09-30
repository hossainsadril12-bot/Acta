"use client";

import { useId, useState } from "react";
import { ArrowRightIcon, CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import type { SiteContent } from "@/content";

type Status = "idle" | "loading" | "success" | "invalid" | "failure";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email capture (MASTER 6.6): visible states for focus, error, loading and success.
// Posts JSON to form.action (the /api/signup route handler by default).
export function SignupForm({ form }: { form: SiteContent["closing"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const id = useId();
  const inputId = `${id}-email`;
  const msgId = `${id}-msg`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus("success");
      else setStatus(res.status === 400 ? "invalid" : "failure");
    } catch {
      setStatus("failure");
    }
  }

  if (status === "success") {
    return (
      <p className="msg ok" role="status">
        <CheckCircleIcon className="i" aria-hidden="true" />
        {form.success}
      </p>
    );
  }

  const error = status === "invalid" ? form.error : status === "failure" ? form.failure : "";

  return (
    <form action={form.action} method="post" noValidate onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={inputId}>
        {form.label}
      </label>
      <div className={`email${error ? " is-error" : ""}`}>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={form.placeholder}
          readOnly={status === "loading"}
          aria-invalid={status === "invalid" || undefined}
          aria-describedby={error ? msgId : undefined}
          onChange={() => status !== "idle" && status !== "loading" && setStatus("idle")}
        />
        <button className="btn btn-primary" type="submit" aria-busy={status === "loading" || undefined}>
          {form.submit}
          {status === "loading" ? <span className="spin" aria-hidden="true" /> : <ArrowRightIcon className="i i-arrow" aria-hidden="true" />}
        </button>
      </div>
      <p id={msgId} className="msg err" aria-live="polite">
        {error && <WarningCircleIcon className="i" aria-hidden="true" />}
        {error}
      </p>
    </form>
  );
}
