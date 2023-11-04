/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lC96Q5TjIeJ
 */
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-600 dark:text-gray-300">
              Loading...
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              Please wait while we process your request.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1 bg-white shadow-lg rounded-lg p-4">
            <svg
              className=" h-6 w-6 text-yellow-500 mb-2 animate-spin"
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
              <path d="M5 22h14" />
              <path d="M5 2h14" />
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
            </svg>
            <h3 className="text-lg font-bold">Time Elapsed</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The time elapsed since the request was made.
            </p>
            <div className="text-2xl font-bold">10 seconds</div>
          </div>
          <div className="grid gap-1 bg-white shadow-lg rounded-lg p-4">
            <svg
              className=" h-6 w-6 text-yellow-500 mb-2 animate-pulse"
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
              <line x1="12" x2="12" y1="20" y2="10" />
              <line x1="18" x2="18" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="16" />
            </svg>
            <h3 className="text-lg font-bold">Processing Status</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The current status of your request.
            </p>
            <div className="text-2xl font-bold">Processing...</div>
          </div>
          <div className="grid gap-1 bg-white shadow-lg rounded-lg p-4">
            <svg
              className=" h-6 w-6 text-yellow-500 mb-2 animate-bounce"
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
              <path d="m16 12-4-4-4 4" />
              <path d="M12 16V8" />
            </svg>
            <h3 className="text-lg font-bold">Next Steps</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              What to do after the processing is complete.
            </p>
            <Button className="mt-4" variant="outline">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
