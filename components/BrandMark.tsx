import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BrandMark({
  href,
  className,
  dotClassName,
}: {
  href?: string;
  className?: string;
  dotClassName?: string;
}) {
  const content = (
    <>
      <span>David</span>
      <span
        aria-hidden="true"
        className={cn(
          "brand-dot mb-[0.13em] ml-1 inline-block h-[5.5px] w-[5.5px] rounded-full bg-[#8b8b8f]",
          dotClassName
        )}
      />
    </>
  );

  const classes = cn(
    "inline-flex items-end font-display text-[24px] font-bold leading-none tracking-[-0.035em] text-grid-ink",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
}
