import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have an idea or project in mind? Send David a message about frontend development, mobile app development, or product design work.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something useful"
        description="Have an idea, project, or digital product you want to bring to life? Send me a message and let's talk through it."
      />
      <div className="mt-8">
        <ContactSection />
      </div>
    </div>
  );
}
