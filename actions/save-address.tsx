"use server";

import { GeocodingResponse } from "@/interfaces";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const saveAddress = async (formData: FormData) => {

  const name = (formData.get("name") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const address = formData.get("address") as string;
  const email = (formData.get("email") as string) || "";
  const installation = (formData.get("installation") as string) || "";
  const electricity_bill = (formData.get("electricity-bill") as string) || "";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (
    typeof electricity_bill !== "string" ||
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof address !== "string" ||
    typeof email !== "string" ||
    typeof installation !== "string"
  ) {
    throw new Error("Invalid data");
  }

  const { data: lead, error } = await supabase
    .from("leads")
    .insert([
      {
        name : "",
        email : "",
        phone : "",
        address : address,
        electricity_bill: 0,
        installation,
      },
    ])
    .select("*")
    .single();

  console.log({ lead, error });

  let encodedAddress;

  if (typeof address !== "string") {
    return;
  } else {
    encodedAddress = encodeURIComponent(address);
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

  const { data: addressResults, error: addressError } = await supabase
    .from("geocoding")
    .insert([
      {
        results: data.results,
        status: data.status,
        lead_id: lead?.id,
      },
    ])
    .select("*")
    .single();

  if (addressError) {
    // throw new Error("Could not save address")
    redirect(`/error`);
  }

  if (!addressResults) {
    // throw new Error("Could not save address")
    redirect(`/error`);
  }

  redirect(`/calculate/${addressResults.id}`);

  // redirect(`/calculate?lat=${data.results[0].geometry.location.lat}&lng=${data.results[0].geometry.location.lng}&address=${data.results[0].formatted_address}`)
};
