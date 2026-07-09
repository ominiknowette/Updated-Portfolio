"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type Ref } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdlkpya";

const projectTypes = [
  "Frontend Development",
  "Mobile App Development",
  "Product / UI Design",
  "Quality Assurance",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "projectType" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: FieldName, value: string) {
  const trimmed = value.trim();

  if (name === "name" && trimmed.length < 2) {
    return "Please enter your name.";
  }

  if (name === "email") {
    if (!trimmed) return "Please enter your email address.";
    if (!emailPattern.test(trimmed)) return "Please enter a valid email address.";
  }

  if (name === "projectType" && !trimmed) {
    return "Please select a project type.";
  }

  if (name === "message") {
    if (!trimmed) return "Please enter a message.";
    if (trimmed.length < 10) return "Your message should be at least 10 characters.";
  }

  return "";
}

function getFormValues(form: HTMLFormElement) {
  const formData = new FormData(form);
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    projectType: String(formData.get("projectType") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

function validateForm(values: Record<FieldName, string>) {
  const errors: FormErrors = {};
  (Object.keys(values) as FieldName[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  function clearErrorWhenValid(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const field = e.currentTarget.name as FieldName;
    if (!errors[field]) return;

    const error = validateField(field, e.currentTarget.value);
    if (!error) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = getFormValues(form);
    const validationErrors = validateForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      setErrors(validationErrors);
      const firstInvalid = Object.keys(validationErrors)[0] as FieldName;
      const firstInvalidElement = form.elements.namedItem(firstInvalid);
      if (firstInvalidElement instanceof HTMLElement) {
        firstInvalidElement.focus();
      }
      return;
    }

    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("projectType", values.projectType);
    formData.set("message", values.message);

    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setErrors({});
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex min-h-[320px] flex-col items-center justify-center text-center"
        role="status"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.045] text-accent-blue">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-grid-ink">
          Message sent
        </h3>
        <p className="mt-2 max-w-[340px] text-[15px] leading-[1.62] text-grid-soft">
          Thanks for reaching out. I&rsquo;ll get back to you soon.
        </p>
        <button
          onClick={() => {
            setErrors({});
            setStatus("idle");
            requestAnimationFrame(() => nameInputRef.current?.focus());
          }}
          className="mt-5 h-11 rounded-full border border-white/[0.08] bg-white/[0.035] px-5 text-sm font-semibold text-grid-ink transition hover:border-white/[0.12] hover:bg-white/[0.055]"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex h-full flex-col", compact ? "gap-3" : "gap-4")} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Name"
          name="name"
          placeholder="Your name"
          required
          error={errors.name}
          onChange={clearErrorWhenValid}
          compact={compact}
          inputRef={nameInputRef}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="Your email"
          required
          error={errors.email}
          onChange={clearErrorWhenValid}
          compact={compact}
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="mb-1.5 block text-xs font-medium text-ink-soft"
        >
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          aria-label="Project Type"
          aria-invalid={errors.projectType ? "true" : undefined}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
          defaultValue=""
          onChange={clearErrorWhenValid}
          className={cn(
            "w-full appearance-none border bg-[#1d1d1d] px-4 text-xs text-grid-ink outline-none transition-colors placeholder:text-grid-muted focus:border-accent-blue/50",
            compact ? "h-[50px] rounded-md" : "rounded-2xl py-3 text-[15px]",
            errors.projectType ? "border-red-400/50" : "border-white/[0.08]"
          )}
        >
          <option value="" disabled className="bg-card text-ink-muted">
            Select a project type
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-card text-ink">
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="projectType-error" className="mt-1.5 text-[11px] leading-relaxed text-red-300">
            {errors.projectType}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium text-ink-soft"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project"
          aria-label="Message"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={clearErrorWhenValid}
          className={cn(
            "w-full resize-none border bg-[#1d1d1d] px-4 py-3 text-xs leading-[1.5] text-grid-ink placeholder:text-grid-muted outline-none transition-colors focus:border-accent-blue/50",
            compact ? "h-[138px] rounded-md" : "rounded-2xl text-[15px]",
            errors.message ? "border-red-400/50" : "border-white/[0.08]"
          )}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-[11px] leading-relaxed text-red-300">
            {errors.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
            <p className="text-[11px] leading-relaxed text-red-300">
              Something went wrong. Please try again or contact me directly by
              email.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "mt-1 inline-flex items-center justify-center gap-2 bg-[#303030] text-xs font-semibold text-white transition hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-70",
          compact ? "h-11 rounded-md px-5" : "rounded-2xl px-5 py-3.5 text-sm"
        )}
      >
        {status === "sending" ? "Sending..." : "Send message"}
        <Send className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  onChange,
  compact = false,
  inputRef,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  compact?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-ink-soft">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        ref={inputRef}
        className={cn(
          "w-full border bg-[#1d1d1d] px-4 text-grid-ink placeholder:text-grid-muted outline-none transition-colors focus:border-accent-blue/50",
          compact ? "h-[50px] rounded-md text-xs" : "rounded-2xl py-3 text-[15px]",
          error ? "border-red-400/50" : "border-white/[0.08]"
        )}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-[11px] leading-relaxed text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
