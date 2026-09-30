import { z } from "zod";

const signupBody = z.object({ email: z.email() });

// Accepts JSON (the enhanced form) or a regular form post (no JavaScript).
// Validates only. Storage is added when a database is chosen.
export async function POST(req: Request): Promise<Response> {
  let input: unknown;
  try {
    const type = req.headers.get("content-type") ?? "";
    if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
      input = Object.fromEntries(await req.formData());
    } else {
      input = await req.json();
    }
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!signupBody.safeParse(input).success) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  return Response.json({ ok: true }, { status: 200 });
}
