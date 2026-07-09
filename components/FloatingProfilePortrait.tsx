import Image from "next/image";
import { Code2, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingProfilePortraitProps = {
  showBadges?: boolean;
  showStatus?: boolean;
  priority?: boolean;
  className?: string;
};

export default function FloatingProfilePortrait({
  showBadges = true,
  showStatus = true,
  priority = false,
  className,
}: FloatingProfilePortraitProps) {
  return (
    <div
      className={cn(
        "profile-image-stage relative mx-auto flex w-full max-w-[320px] items-center justify-center overflow-visible lg:max-w-[360px]",
        "h-[166px] min-[390px]:h-[176px] sm:h-[186px] lg:h-[150px] xl:h-[156px]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute rounded-[38px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(145,145,150,0.07)_44%,transparent_72%)] blur-2xl",
          "h-[150px] w-[150px] min-[390px]:h-[160px] min-[390px]:w-[160px] sm:h-[176px] sm:w-[176px] lg:h-[162px] lg:w-[162px]"
        )}
      />

      <div className="profile-motion-group relative z-10">
        <div
          className={cn(
            "relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#171717] shadow-[0_18px_50px_-18px_rgba(0,0,0,0.78),0_0_30px_rgba(255,255,255,0.045)]",
            "h-[128px] w-[128px] min-[390px]:h-[140px] min-[390px]:w-[140px] sm:h-[148px] sm:w-[148px] lg:h-[145px] lg:w-[145px] xl:h-[150px] xl:w-[150px]"
          )}
        >
          <Image
            src="/images/david-profile.jpg"
            alt="Okafor Onyekachukwu David"
            fill
            sizes="(max-width: 374px) 128px, (max-width: 430px) 140px, (max-width: 1024px) 148px, 150px"
            className="object-cover object-[center_42%]"
            priority={priority}
          />
        </div>

        {showStatus && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-2 -right-2 z-20 flex items-center justify-center rounded-full border border-white/[0.09] bg-[#171717] shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
              "h-7 w-7 lg:h-8 lg:w-8"
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#949499]" />
          </span>
        )}
      </div>

      {showBadges && (
        <>
          <div className="absolute left-4 top-2 z-20 inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#171717]/95 px-2.5 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.34)] sm:left-4 lg:left-2">
            <Code2 className="h-3.5 w-3.5 text-[#b4b4b8]" />
            <span className="text-[10px] font-medium text-[#a5a5aa]">Frontend</span>
          </div>

          <div className="absolute bottom-2 right-8 z-20 inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#171717]/95 px-2.5 py-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.34)] sm:right-6 lg:right-2">
            <Smartphone className="h-3.5 w-3.5 text-[#b4b4b8]" />
            <span className="text-[10px] font-medium text-[#a5a5aa]">Mobile</span>
          </div>
        </>
      )}
    </div>
  );
}
