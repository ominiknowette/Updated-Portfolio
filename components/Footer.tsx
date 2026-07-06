import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { contact } from "@/data/profile";
import { currentYear } from "@/lib/utils";

const socials = [
  { icon: Github, href: contact.github, label: "GitHub" },
  { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: contact.instagramUrl, label: "Instagram" },
  { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
              David<span className="text-accent-blue">.</span>
            </Link>
            <p className="mt-2 max-w-sm text-[15px] leading-[1.62] text-ink-soft">
              I build clean websites, mobile experiences, and digital
              products from Lagos, Nigeria.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full card-border bg-card-soft text-ink-muted transition-colors hover:text-ink hover:border-white/20"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-ink-muted">
            © {currentYear()} David. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-ink-muted">
            Status: <span className="text-accent-blue">Open to interesting projects</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
