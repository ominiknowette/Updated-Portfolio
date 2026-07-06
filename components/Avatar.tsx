import Image from "next/image";
import { cn } from "@/lib/utils";

// Profile photo lives at /public/images/david-profile.jpg
// Replace that file with a new photo any time — this path never needs to change.
const PROFILE_IMAGE_SRC = "/images/david-profile.jpg";

interface AvatarProps {
  /** Tailwind width/height classes, e.g. "h-28 w-28 sm:h-36 sm:w-36". */
  sizeClassName?: string;
  /** `sizes` hint passed to next/image for responsive loading. */
  imageSizes?: string;
  className?: string;
  /** Set true only for the single above-the-fold instance (homepage hero). */
  priority?: boolean;
  /** Adds the blue-violet ambient glow behind the frame. */
  glow?: boolean;
}

export default function Avatar({
  sizeClassName = "h-28 w-28 sm:h-36 sm:w-36",
  imageSizes = "(min-width: 640px) 144px, 112px",
  className,
  priority = false,
  glow = true,
}: AvatarProps) {
  return (
    <div className={cn("relative shrink-0", sizeClassName, className)}>
      {glow && (
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-accent-gradient opacity-60 blur-lg sm:blur-xl" />
      )}
      <div className="relative h-full w-full overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/[0.1] shadow-[0_14px_36px_-14px_rgba(139,92,246,0.45)] sm:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)]">
        <Image
          src={PROFILE_IMAGE_SRC}
          alt="Okafor Onyekachukwu David profile photo"
          fill
          sizes={imageSizes}
          className="object-cover"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>
    </div>
  );
}
