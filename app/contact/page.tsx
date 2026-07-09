import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have an idea or project in mind? Send David a message about frontend development, mobile app development, or product design work.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-10 sm:px-6 lg:px-0 lg:pt-12">
      <ContactSection />
    </div>
  );
}
