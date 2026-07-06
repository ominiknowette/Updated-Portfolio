export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function currentYear(): number {
  return new Date().getFullYear();
}
