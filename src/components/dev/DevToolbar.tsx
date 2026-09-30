"use client";

import { Agentation } from "agentation";

// Agentation visual-feedback toolbar (development only; layout.tsx never renders it in production).
// Click elements on the page, add notes, and copy structured feedback for an AI coding agent.
export function DevToolbar({ appName }: { appName: string }) {
  return <Agentation appName={appName} />;
}
