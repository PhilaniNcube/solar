"use client"

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
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
import { saveAddress } from "@/actions/save-address";
import { useState } from "react";

type AutoCompleteType = {
  label: string
  value: {
    matched_substrings: {
      length: number
      offset: number
    }[]
    description: string
    place_id: string
    reference: string
    structured_formatting: {
      main_text: string
      secondary_text: string
      main_text_substring: {
        offset: number
        length: number
      }[]
    }
    terms: {
      offset: number
      value: string
    }[]
    types: string[]
  }
}

const AddressForm =  () => {

    const [value, setValue] = useState<AutoCompleteType | null>(null);

    console.log(value);


  return (
    <div className="grid grid-cols-1 gap-6 py-10 mx-auto lg:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Prime Solar</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Discover the solar power potential of your home with just your
            address. Enter your information below and let us help you unlock the
            power of the sun!
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            In South Africa the map coverage for solar data is limited to
            Johannesburg, Pretoria, Durban, East London, Gqeberha and Cape Town.
            Newer buildings may not also be included in the dataset
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
            <Label htmlFor="address">Enter Street Address</Label>
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}
              selectProps={{
                value,
                onChange: setValue,
              }}
            />
            <Input required type="hidden" name="address" value={value?.label} />
          </div>

          <div className="space-y-2">
            {/* <Label htmlFor="electricity-bill">Monthly Electricity Bill</Label>
            <Input
              id="electricity-bill"
              name="electricity-bill"
              // placeholder="Enter your address"
              required
              type="number"
            /> */}
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
                    <Grid3X3 className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <PlusIcon className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <UtilityPole className="w-3 h-3 md:w-6 md:h-6 mb-3" />
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
                    <UtilityPole className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <PlusIcon className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <Grid3X3 className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <BatteryChargingIcon className="w-3 h-3 md:w-6 md:h-6 mb-3 -rotate-90" />
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
                    <Grid3X3 className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <PlusIcon className="w-3 h-3 md:w-6 md:h-6 mb-3" />
                    <BatteryChargingIcon className="w-3 h-3 md:w-6 md:h-6 mb-3 -rotate-90" />
                    <BatteryChargingIcon className="w-3 h-3 md:w-6 md:h-6 mb-3 -rotate-90" />
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
