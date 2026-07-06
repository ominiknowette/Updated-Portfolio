"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}
    >
      <div
        className={`mb-3 flex items-center gap-2 text-[13px] font-medium tracking-normal text-accent-blue ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
        {eyebrow}
      </div>
      <h2 className="font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.68] text-ink-soft sm:text-[17px]">{description}</p>
      )}
    </motion.div>
  );
}
