import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import getSolarData from "@/lib/solar-data";
import formatArea from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { HomeIcon, Link, LockKeyhole, ShieldQuestion } from "lucide-react";
import { cookies } from "next/headers";
import RoofSegments from "./roof-segments";
import { redirect } from "next/navigation";

type SolarDataProps = {
  lat: number;
  lng: number;
};

const SolarData = async ({lat, lng}:SolarDataProps) => {

   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {data:solarpanels, error} = await supabase.from("solar_panels").select('*').order("output", {ascending: true});

   const {data:batteries, error:batteriesError} = await supabase.from("batteries").select('*');
   const {data:inverters, error:invertersError} = await supabase.from("inverters").select('*');



     const solarData = await getSolarData(lat, lng);

     console.log({solarData})

     const {
       imageryQuality,
       regionCode,
       solarPotential,
       center,
       boundingBox,
       name,
       imageryDate,
       imageryProcessedDate,
     } = solarData;



  return (
    <section className="py-6">
      <div className="col-span-5 bg-slate-300 min-h-[600px] rounded-lg p-2 lg:p-8 shadow-lg">
        <p className="text-lg font-medium lg:text-3xl text-slate-800">
          There are {solarPotential.solarPanelConfigs.length} solar panels
          configurations available at this address!{" "}
        </p>
        <RoofSegments
          boundingBox={boundingBox}
          center={center}
          panelWidth={solarPotential.panelWidthMeters}
          panelHeight={solarPotential.panelHeightMeters}
          solarCapacity={solarPotential.panelCapacityWatts}
          roofSegments={solarPotential.roofSegmentStats}
          solarPanels={solarpanels!}
          inverters={inverters!}
          batteries={batteries!}
          configs={solarPotential.solarPanelConfigs}
        />
      </div>
    </section>
  );
};
export default SolarData;
