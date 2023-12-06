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
    <section className="container py-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1">
          <div>
            <Card className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-4">
                <HomeIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Roof Area
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    {solarPotential.maxArrayAreaMeters2.toFixed(2)} m
                    <sup>2</sup>
                  </CardDescription>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-4">
                <ShieldQuestion className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Solar Output
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    {(
                      solarPotential.solarPanelConfigs[0].yearlyEnergyDcKwh *
                      solarOutputRatio
                    ).toFixed(2)}{" "}
                    kWh
                  </CardDescription>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-4">
                <LockKeyhole className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Services
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    What we offer
                  </CardDescription>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-4">
                <Link className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Contact
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    Get in touch with us
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-4 bg-slate-300 min-h-[600px] rounded-lg p-8 shadow-lg">
          {/*  */}
          <p className="font-medium text-slate-800">
            How many solar panels configurations are available at this address?{" "}
            {solarPotential.solarPanelConfigs.length}{" "}
          </p>
          <RoofSegments roofSegments={solarPotential.roofSegmentStats} solarPanels={solarPotential.solarPanels} configs={solarPotential.solarPanelConfigs} />


        </div>
      </div>
    </section>
  );
};
export default SolarData;
