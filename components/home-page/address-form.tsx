import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { GeocodingResponse } from "@/interfaces";

const AddressForm = async () => {

  const saveAddress = async (formData:FormData) => {
    "use server"
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    const address = formData.get("address")
    const email = formData.get("email")


     let encodedAddress;

     if(typeof address !== "string") {
       return
    } else {
      encodedAddress = encodeURIComponent(address)
     }

    const gecodingUrl = new URL(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
    );

     const response = await fetch(gecodingUrl)
       .then((res) => res.json())
       .then((data) => data)
       .catch((err) => console.log(err));

      if (!response || response.status === "ZERO_RESULTS") {
        throw new Error("Could not find location for the specified address.");
      }

      const data: GeocodingResponse = await response;

      redirect(`/calculate?lat=${data.results[0].geometry.location.lat}&lng=${data.results[0].geometry.location.lng}&address=${data.results[0].formatted_address}`)

  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Solar Power Potential
          </h2>
          <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Enter your address to check out the potential of your home for solar
            power generation.
          </p>
        </div>
        <form
          action={saveAddress}
          className="w-full max-w-md mx-auto space-y-4"
        >
          <Label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="address"
          >
            Street Address
          </Label>
          <Input
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="address"
            name="address"
            required
            type="text"
          />
          <Button
            className="w-full py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
            type="submit"
            variant="default"
          >
            Calculate
          </Button>
        </form>
      </div>
    </section>
  );
};
export default AddressForm;
