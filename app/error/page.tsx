/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fElbX7UbmaW
 */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component({searchParams}: {searchParams: {[key:string]: string | string[] | undefined}}) {

  console.log({searchParams});

  const message = searchParams.message ? searchParams.message : "No Solar Potential Found";

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 space-y-12 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              No Solar Potential Found
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              We're sorry, {message}
            </p>
          </div>
        </div>
        <div className="grid items-start max-w-sm gap-8 mx-auto sm:max-w-4xl">
          <div className="grid items-center justify-center max-w-md gap-1 mx-auto text-center bg-white">
            <h3 className="text-lg font-bold">
              Most likely the address you provided is not yet covered and solar
              information has not yet been gathered for that address. In South
              Africa the map coverage for solar data is limited to Johannesburg,
              Pretoria, Durban, East London, Gqeberha and Cape Town. Newer
              buildings may not also be included in the dataset
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Please check the address and try again.
            </p>{" "}

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
