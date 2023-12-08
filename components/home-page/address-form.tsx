import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GeocodingResponse } from "@/interfaces";
import { Battery, BatteryChargingIcon, Grid3X3, Home, Link2OffIcon, PlusIcon, UtilityPole } from "lucide-react";
import SubmitButton from "../submit-button";

const AddressForm = async () => {

  const saveAddress = async (formData:FormData) => {
    "use server"

     const name = formData.get("name") as string || "";
     const phone = formData.get("phone") as string || "";
     const address = formData.get("address") as string;
     const email = formData.get("email") as string || "";
     const installation = formData.get("installation") as string || "";
     const electricity_bill = formData.get("electricity-bill") as string  || "";

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    if(typeof electricity_bill !== "string" || typeof name !== "string" || typeof phone !== "string" || typeof address !== "string" || typeof email !== "string" || typeof installation !== "string") {
      throw new Error("Invalid data")
    }



const { data: lead, error } = await supabase
  .from("leads")
  .insert([
    {
      name,
      email,
      phone,
      address,
      electricity_bill: Number(electricity_bill),
      installation,
    },
  ])
  .select("*").single();

  console.log({lead, error})



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
       .catch((err) => console.error(err));

      if (!response || response.status === "ZERO_RESULTS") {
        redirect(`/error`);
        // throw new Error("Could not find location for the specified address.");
      }

      const data: GeocodingResponse = await response;

      const {data:addressResults, error:addressError} = await supabase.from("geocoding").insert([{
       results: data.results,
       status: data.status,
       lead_id: lead?.id
      }]).select("*").single()



      if(addressError) {
        // throw new Error("Could not save address")
        redirect(`/error`)

      }

      if(!addressResults) {
        // throw new Error("Could not save address")
        redirect(`/error`)
      }

      redirect(`/calculate/${addressResults.id}`)

      // redirect(`/calculate?lat=${data.results[0].geometry.location.lat}&lng=${data.results[0].geometry.location.lng}&address=${data.results[0].formatted_address}`)

  }

  return (
    <div className="grid grid-cols-1 gap-6 py-10 mx-auto lg:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Radiant Potential</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Discover the solar power potential of your home with just your
            address. Enter your information below and let us help you unlock the
            power of the sun!
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
          In South Africa the map coverage for solar data is limited to Johannesburg, Pretoria, Durban, East London, Gqeberha and Cape Town. Newer buildings may not also be included in the dataset
          </p>
        </div>
        <form action={saveAddress} className="space-y-4">
          <div className="space-y-2">
            {/* <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              type="text"
              required
            /> */}
            {/* <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              type="email"
            /> */}
            {/* <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
              type="tel"
            /> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="electricity-bill">Monthly Electricity Bill</Label>
            <Input
              id="electricity-bill"
              name="electricity-bill"
              // placeholder="Enter your address"
              required
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label>
              What type of solar installation are you interested in?
            </Label>
            <RadioGroup
              name="installation"
              defaultValue="solar"
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="solar"
                  id="solar"
                  className="sr-only peer"
                />
                <Label
                  htmlFor="solar"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="flex space-x-2">
                    <Grid3X3 className="w-6 h-6 mb-3" />
                    <PlusIcon className="w-6 h-6 mb-3" />
                    <UtilityPole className="w-6 h-6 mb-3" />
                  </span>
                  Solar Panels
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="hybrid"
                  id="hybrid"
                  className="sr-only peer"
                />
                <Label
                  htmlFor="hybrid"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="flex space-x-2">
                    <UtilityPole className="w-6 h-6 mb-3" />
                    <PlusIcon className="w-6 h-6 mb-3" />
                    <Grid3X3 className="w-6 h-6 mb-3" />
                    <BatteryChargingIcon className="w-6 h-6 mb-3 -rotate-90" />
                  </span>
                  Hybrid Solar
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="off-grid"
                  id="off-grid"
                  className="sr-only peer"
                />
                <Label
                  htmlFor="off-grid"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="flex space-x-2">
                    <Grid3X3 className="w-6 h-6 mb-3" />
                    <PlusIcon className="w-6 h-6 mb-3" />
                    <BatteryChargingIcon className="w-6 h-6 mb-3 -rotate-90" />
                    <BatteryChargingIcon className="w-6 h-6 mb-3 -rotate-90" />
                  </span>
                  Full Off Grid
                </Label>
              </div>
            </RadioGroup>
          </div>
          <SubmitButton>Submit</SubmitButton>
        </form>
      </div>
      <div>
        <img
          alt="Solar Installations"
          className="object-cover w-full h-full rounded-md shadow-md"
          height="500"
          src="/images/home.png"
          style={{
            aspectRatio: "600/500",
            objectFit: "cover",
          }}
          width="600"
        />
      </div>
    </div>
  );
};
export default AddressForm;
