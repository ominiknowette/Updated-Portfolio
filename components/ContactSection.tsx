import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contact, profile } from "@/data/profile";
import ContactForm from "./ContactForm";
import { GridCard, SocialButton } from "./GridPrimitives";
import Sparkle from "./decorations/Sparkle";

const details = [
  { icon: Mail, label: "Mail me", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Contact me", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
];

export default function ContactSection() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-[52px]">
      <aside>
        <h1 className="mb-6 text-xs font-semibold uppercase tracking-[0.04em] text-grid-ink">
          Contact Info
        </h1>
        <div className="space-y-8">
          {details.map((detail) => (
            <div key={detail.label} className="flex gap-4">
              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-[#1d1d1d] text-grid-soft">
                <detail.icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-grid-muted">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="mt-2 block text-xs font-semibold leading-5 text-grid-ink transition hover:text-accent-blue"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-2 text-xs font-semibold leading-5 text-grid-ink">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-5 mt-12 text-xs font-semibold uppercase tracking-[0.04em] text-grid-ink">
          Social Info
        </h2>
        <div className="grid w-fit grid-cols-3 gap-3 min-[390px]:gap-4">
          <SocialButton href={contact.github} label="GitHub" icon={Github} />
          <SocialButton href={contact.linkedin} label="LinkedIn" icon={Linkedin} />
          <SocialButton href={contact.instagramUrl} label="Instagram" icon={Instagram} />
        </div>
      </aside>

      <GridCard className="min-h-0 lg:min-h-[520px] lg:p-7">
        <Sparkle variant="eight" className="right-5 top-5 h-10 w-10 text-white/22 md:right-6 md:h-14 md:w-14 md:text-white/26" />
        <div className="relative z-10">
          <h2 className="mb-6 pr-10 font-display text-[28px] font-semibold leading-[1.08] text-grid-ink md:text-[32px]">
            Let&rsquo;s work <span className="text-accent-blue">together.</span>
          </h2>
          <ContactForm compact />
        </div>
      </GridCard>
    </div>
  );
}
