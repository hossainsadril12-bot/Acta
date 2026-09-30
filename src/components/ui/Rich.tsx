// Renders content strings that use the [[phrase]] convention from src/content/schema.ts.
// "hl" draws the detected-phrase underline; "mark" highlights a search match.

export function Rich({ text, as = "hl" }: { text: string; as?: "hl" | "mark" }) {
  const parts = text.split(/\[\[(.+?)\]\]/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          part
        ) : as === "mark" ? (
          <mark key={i} className="m">
            {part}
          </mark>
        ) : (
          <span key={i} className="hl">
            {part}
          </span>
        ),
      )}
    </>
  );
}

export function plain(text: string): string {
  return text.replace(/\[\[(.+?)\]\]/g, "$1");
}
