/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fElbX7UbmaW
 */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              No Solar Potential Found
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              We're sorry, but we couldn't find any solar potential for the
              provided address.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl">
          <div className="grid gap-1 items-center justify-center max-w-md bg-white mx-auto">
            <svg
              className=" h-16 w-16 text-red-500 mb-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <h3 className="text-lg font-bold">Error</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Please check the address and try again.
            </p>
            <Link href="/">
              <Button className="mt-4" variant="outline">
                Return
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
