import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import getSolarData from "@/lib/solar-data";
import formatArea from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { HomeIcon, Link, LockKeyhole, ShieldQuestion } from "lucide-react";
import { cookies } from "next/headers";
import RoofSegments from "./roof-segments";

type SolarDataProps = {
  lat: number;
  lng: number;
};

const SolarData = async ({lat, lng}:SolarDataProps) => {

   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {data:solarpanels, error} = await supabase.from("solar_panels").select('*').order("output", {ascending: true});

  const solarData = await getSolarData(lat, lng);


  const {imageryQuality,regionCode,solarPotential,center,boundingBox,name,imageryDate,imageryProcessedDate} = solarData;

  const solarOutputRatio = solarpanels !== null ? solarpanels[0].output / solarPotential.panelCapacityWatts : 1

  return (
    <section className="py-6">
      <div className="col-span-5 bg-slate-300 min-h-[600px] rounded-lg p-2 lg:p-8 shadow-lg">

        <p className="font-medium text-slate-800">
          How many solar panels configurations are available at this address?{" "}
          {solarPotential.solarPanelConfigs.length}{" "}
        </p>
        <RoofSegments
          roofSegments={solarPotential.roofSegmentStats}
          solarPanels={solarPotential.solarPanels}
          configs={solarPotential.solarPanelConfigs}
        />
      </div>
    </section>
  );
};
export default SolarData;
