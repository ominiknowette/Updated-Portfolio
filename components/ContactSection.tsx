import { Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import { contact } from "@/data/profile";
import BentoCard from "./BentoCard";
import ContactForm from "./ContactForm";

const details = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone / WhatsApp", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { icon: Github, label: "GitHub", value: "ominiknowette", href: contact.github },
  { icon: Linkedin, label: "LinkedIn", value: "onyekachukwu-okafor", href: contact.linkedin },
  { icon: Instagram, label: "Instagram", value: `@${contact.instagram}`, href: contact.instagramUrl },
];

export default function ContactSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
      <BentoCard className="lg:col-span-2" tag="CONTACT_INFO">
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <p className="text-[13px] font-medium text-accent-blue">
              GET IN TOUCH
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-[1.16] tracking-[-0.015em] text-ink">
              However you&rsquo;d like to reach me.
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {details.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href}
                  target={d.href.startsWith("http") ? "_blank" : undefined}
                  rel={d.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-accent-blue/30 hover:bg-white/[0.04]"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] card-border">
                    <d.icon className="h-4 w-4 text-accent-blue" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium text-ink-muted">{d.label}</span>
                    <span className="block truncate text-sm leading-snug text-ink-soft">{d.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </BentoCard>

      <BentoCard className="lg:col-span-3" glow tag="MESSAGE_FORM">
        <ContactForm />
      </BentoCard>
    </div>
  );
}
