//@ts-ignore
import { Database } from "@/interfaces/supabase";
import formatCurrency from "@/lib/format-currency";
// @ts-ignore
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { DollarSign, Grid3X3Icon } from "lucide-react";
import Map from "./Map";
import { DataResponse } from "@/interfaces";

type HeroProps = {
  address: Database['public']['Tables']['geocoding']['Row']
  solarData: DataResponse
}

const Hero = ({ address, solarData }: HeroProps) => {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">

          {/* <GoogleMapsEmbed
            className="w-full aspect-video"
            style="width:100%;height:100%; aspect-ratio: 16/12;"
            allowfullscreen
            loading="lazy"
            zoom={20}
            apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}
            center={`${address.results[0].geometry.location.lat},${address.results[0].geometry.location.lng}`}
            // height={550}
            // width={700}
            mode="place"
            mapType="satellite"
            q={`${address.results[0].formatted_address}`}
          /> */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tighter lg:text-3xl 2xl:text-4xl">
                {address.results[0].formatted_address}
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* <div className="p-4 bg-white shadow-xl rounded-xl">
                <DollarSign className="w-8 h-8" />
                <h2 className="mb-2 text-2xl font-semibold">
                  Average Electricity Bill
                </h2>
                <p className="text-3xl font-extrabold uppercase">
                  {formatCurrency(address.lead_id.electricity_bill)}
                </p>
              </div> */}
              <div className="p-4 bg-white shadow-xl rounded-xl">
                <Grid3X3Icon className="w-8 h-8" />
                <h2 className="mb-2 text-2xl font-semibold">
                  Desired Solar System
                </h2>
                <p className="text-2xl font-extrabold uppercase">
                  {address.lead_id.installation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;


