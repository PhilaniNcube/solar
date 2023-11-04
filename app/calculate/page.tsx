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
    .catch((err) => console.log("Seems we have an error", err));

    const solar: DataResponse  = await res;



      if (solar.name === undefined) {
        redirect(`/error?address=${address}`);
      }

  return (
    <main className="flex flex-col items-center justify-center">
      <Suspense fallback={`...Loading`}>
      <Potential solarData={solar} address={address} />
        <RoofSections
          segments={solar.solarPotential.roofSegmentStats}
          solarConfig={solar.solarPotential.solarPanelConfigs}
        />
      </Suspense>
    </main>
  );
};
export default page;
