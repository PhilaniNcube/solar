import { DataResponse, DataResponseError, DatalayerError } from "@/interfaces";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qmdOpAjO0gT
 */
export default function Potential({
  address,
  solarData,
}: {
  address: string;
  solarData: DataResponse;
}) {



  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Solar Power Potential
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {address}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1">
            <svg
              className=" h-6 w-6 text-yellow-500 mb-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <h3 className="text-lg font-bold">Sunlight Exposure</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The total number of sunlight hours your home receives annually.
            </p>
            <div className="text-2xl font-bold">
              {solarData.solarPotential.maxSunshineHoursPerYear.toFixed(2)}{" "}
              hrs/year
            </div>
          </div>
          <div className="grid gap-1">
            <svg
              className=" h-6 w-6 text-yellow-500 mb-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h3 className="text-lg font-bold">Estimated Power Generation</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The estimated amount of total power that can be generated from the
              sunlight from the roof.
            </p>
            <div className="text-2xl font-bold">
              {solarData.solarPotential.solarPanelConfigs[
                solarData.solarPotential.solarPanelConfigs.length - 1
              ].yearlyEnergyDcKwh.toFixed(0)}{" "}
              kWh/year
            </div>
          </div>
          <div className="grid gap-1">
            {" "}
            <svg
              className=" h-6 w-6 text-yellow-500 mb-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h3 className="text-lg font-bold">Max Number Solar Panels</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The maximum number of solar panels{" "}
              <strong>
                ({solarData.solarPotential.panelHeightMeters} x{" "}
                {solarData.solarPotential.panelWidthMeters} sqm)
              </strong>{" "}
              that can be installed on the building.
            </p>
            <div className="text-2xl font-bold">
              {solarData.solarPotential.maxArrayPanelsCount} panels
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
