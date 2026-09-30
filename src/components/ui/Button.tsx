import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
};

export function buttonClass(variant: Variant = "primary", size: "md" | "lg" = "md", extra = "") {
  return ["btn", `btn-${variant}`, size === "lg" ? "btn-lg" : "", extra].filter(Boolean).join(" ");
}

export function Button({ href, children, variant = "primary", size = "md", arrow = false, className = "" }: ButtonProps) {
  return (
    <a href={href} className={buttonClass(variant, size, className)}>
      {children}
      {arrow && <ArrowRightIcon className="i i-arrow" aria-hidden="true" />}
    </a>
  );
}
