import Image from "next/image";
import { GridCard, Overline } from "./GridPrimitives";

export default function CredentialsCard({
  className,
  titleClassName = "text-base",
}: {
  className?: string;
  titleClassName?: string;
}) {
  return (
    <GridCard href="/about" arrow className={className} ariaLabel="View David Okafor credentials">
      <div className="relative z-10 flex h-full min-h-[138px] flex-col justify-between lg:min-h-0">
        <div className="flex flex-1 items-center justify-center pb-4 lg:pb-6">
          <Image
            src="/images/david-signature.png"
            alt="David Okafor handwritten signature"
            width={600}
            height={200}
            className="credential-signature h-auto w-[150px] object-contain opacity-75 transition duration-300 ease-out sm:w-[160px] lg:w-[170px]"
          />
        </div>
        <div>
          <Overline>More about me</Overline>
          <h2 className={`mt-2 font-display font-semibold text-grid-ink ${titleClassName}`}>
            Credentials
          </h2>
        </div>
      </div>
    </GridCard>
  );
}
