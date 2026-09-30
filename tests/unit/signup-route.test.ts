// @vitest-environment node
import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/signup/route";

const req = (body: string) =>
  new Request("http://localhost/api/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

describe("POST /api/signup", () => {
  it("accepts a valid email", async () => {
    const res = await POST(req(JSON.stringify({ email: "maya@northwind.io" })));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rejects an invalid email", async () => {
    const res = await POST(req(JSON.stringify({ email: "not-an-email" })));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_email" });
  });

  it("rejects a body that is not JSON", async () => {
    const res = await POST(req("{oops"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_json" });
  });
});

describe("POST /api/signup without JavaScript", () => {
  it("accepts a regular form post", async () => {
    const res = await POST(
      new Request("http://localhost/api/signup", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "email=maya%40northwind.io",
      }),
    );
    expect(res.status).toBe(200);
  });
});
