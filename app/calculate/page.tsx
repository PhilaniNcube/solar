import Potential from "@/components/calculate-page/Potential";
import RoofSections from "@/components/calculate-page/roof-sections";
import { DataResponse, DataResponseError, DatalayerError } from "@/interfaces";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async ({
  searchParams: { lat, lng, address },
}: {
  searchParams: { lat: string; lng: string; address: string };
}) => {

  const coords = { lat: Number(lat), lng: Number(lng) };



   const url = new URL(
     `https://solar.googleapis.com/v1/buildingInsights:findClosest?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
   );

    url.searchParams.append("location.latitude", lat.toString());
    url.searchParams.append("location.longitude", lng.toString());

  const res = await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error("Seems we have an error", err));

    const solar: DataResponse  = await res;



      if (solar.name === undefined) {
        redirect(`/error?address=${address}`);
      }

  return (
    <main className="py-10 container">
      <Potential coords={coords} address={address} solarData={solar} />
    </main>
  );
};
export default page;
