import { DataResponse, DataResponseError, DatalayerError } from "@/interfaces";
//@ts-ignore
import {GoogleMapsEmbed} from "@next/third-parties/google"
import { Building2, Grid2X2Icon, Sun } from "lucide-react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qmdOpAjO0gT
 */
export default function Potential({
  coords,
  address,
  solarData,
}: {
  coords: {
    lat: number;
    lng: number;
  }
  address: string;
  solarData: DataResponse;
}) {



  return (
    <section className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
      <GoogleMapsEmbed
        // className="w-full aspect-video"
        style="width:100%;height:100%; aspect-ratio: 16/12;"
        allowfullscreen
        loading="lazy"
        zoom="20"
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}
        center={`${coords.lat},${coords.lng}`}
        // height={550}
        // width={700}
        mode="place"
        maptype="satellite"
        q={`${address}`}
      />
      <div className="w-full">
        <h1 className="mb-4 text-4xl font-bold">Address Details</h1>
      </div>
    </section>
  );
}
