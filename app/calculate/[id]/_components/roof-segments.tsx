"use client"

import { Separator } from "@/components/ui/separator";
import getDirection from "@/lib/direction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaChartIcon, BatteryCharging, CheckCheckIcon, CompassIcon, CrossIcon, Grid3X3, HomeIcon, MinusIcon, PlusIcon, TriangleIcon, X } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Database } from "@/interfaces/supabase";
import { Label } from "@/components/ui/label";
import formatCurrency from "@/lib/format-currency";
import { Button } from "@/components/ui/button";
import Map from "./Map";

type Battery = Database['public']['Tables']['batteries']['Row'];
type Inverter = Database['public']['Tables']['inverters']['Row'];

type Configs = {
  panelsCount: number;
  yearlyEnergyDcKwh: number;
  roofSegmentSummaries: {
    pitchDegrees: number;
    azimuthDegrees: number;
    panelsCount: number;
    yearlyEnergyDcKwh: number;
    segmentIndex: number;
  }[];
}[];

type SolarPanels = Database['public']['Tables']['solar_panels']['Row'][];

type RoofSegment = {
  pitchDegrees: number;
  azimuthDegrees: number;
  stats: {
    areaMeters2: number;
    sunshineQuantiles: number[];
    groundAreaMeters2: number;
  };
  center: {
    latitude: number;
    longitude: number;
  };
  boundingBox: {
    sw: {
      latitude: number;
      longitude: number;
    };
    ne: {
      latitude: number;
      longitude: number;
    };
  };
  planeHeightAtCenterMeters: number;
};


const RoofSegments = ({
  boundingBox,
  center,
  panelWidth,
  panelHeight,
  solarCapacity,
  roofSegments,
  solarPanels,
  configs,
  batteries,
  inverters
}: {
  boundingBox: {
    sw : {
      latitude: number,
      longitude: number
    },
    ne : {
      latitude: number,
      longitude: number
    }
  }
  center:{latitude: number, longitude:number},
  roofSegments: RoofSegment[];
  solarPanels: SolarPanels;
  configs: Configs;
  solarCapacity: number;
  panelWidth: number;
  panelHeight: number;
  inverters: Inverter[];
  batteries: Battery[];
}) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<number>(0);

  const [selectedConfigIndex, setSelectedConfigIndex] = useState<number>(0);
  const [selectedPanelsIndex, setSelectedPanelsIndex] = useState<number>(0);

  const solarOutputRatio =
    solarPanels !== null
      ? solarPanels[selectedPanelsIndex].output / solarCapacity
      : 1;

      const panelsPrice =
        solarPanels[selectedPanelsIndex].price *
        Math.ceil(
          (panelHeight * panelWidth * configs[selectedConfigIndex].panelsCount) /
            ((solarPanels[selectedPanelsIndex].height *
              solarPanels[selectedPanelsIndex].width) /
              1000000)
        );

        console.log(formatCurrency(panelsPrice));

        const selectedBattery = batteries[0]

        const selectedInverter = inverters[0]

        const [numBatteries, setNumBatteries] = useState(0)

        // function to add batteries to the system
        const addBattery = () => {
          setNumBatteries(numBatteries + 1)
        }

        // function to remove batteries from the system
        const removeBattery = () => {
          setNumBatteries(numBatteries - 1)
        }

      // console.log({inverters, batteries})

      const totalDailyCapacity = (
        (configs[selectedConfigIndex].yearlyEnergyDcKwh / 365) *
        solarOutputRatio
      );


      const maxBatteries = Math.ceil(totalDailyCapacity / selectedBattery.capacity);

      console.log({maxBatteries})

  return (
    <div className="w-full mt-2">
      <Separator className="my-3" />
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-y-5">
          <div>
            <Label className="py-3">Select Solar Panel Brand</Label>
            <Select
              onValueChange={(value) => setSelectedPanelsIndex(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[400px] w-full">
                  {solarPanels.map((panels, index) => (
                    <SelectItem
                      onChange={() => setSelectedPanelsIndex(Number(index))}
                      key={index}
                      value={index.toString()}
                    >
                      {panels.name}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="py-3">Select Solar Panel Array Area</Label>
            <Select
              onValueChange={(value) => setSelectedConfigIndex(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Solar Panel Array Size" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[400px] w-full">
                  {configs.map((config, index) => (
                    <SelectItem
                      onChange={() => setSelectedConfigIndex(Number(index))}
                      key={index}
                      value={index.toString()}
                    >
                      {(panelHeight * panelWidth * config.panelsCount).toFixed(
                        2
                      )}
                      {""}m<sup>2</sup> {"~"} approx{" "}
                      {Math.ceil(
                        (panelHeight * panelWidth * config.panelsCount) /
                          ((solarPanels[selectedPanelsIndex].height *
                            solarPanels[selectedPanelsIndex].width) /
                            1000000)
                      )}{" "}
                      solar panels
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full p-4 bg-slate-100">
            <h3 className="text-xl font-bold text-slate-800">Solar Panels</h3>
            <p className="flex items-center space-x-2 font-medium text-md text-slate-700">
              {solarPanels[selectedPanelsIndex].name} x{" "}
              {Math.ceil(
                (panelHeight *
                  panelWidth *
                  configs[selectedConfigIndex].panelsCount) /
                  ((solarPanels[selectedPanelsIndex].height *
                    solarPanels[selectedPanelsIndex].width) /
                    1000000)
              )}{" "}
              = {formatCurrency(panelsPrice)}
            </p>
          </div>
        </div>
        <div className="w-full p-3 bg-white rounded-md shadow-md">
          <Label className="text-2xl"> Battery Set Up</Label>
          <div className="flex items-center">
            <BatteryCharging className="w-20 h-20 -rotate-90" />
            <X className="w-10 h-10" />
            <div className="flex items-center justify-center space-x-4">
              <Button
                type="button"
                size="sm"
                className="bg-red-500"
                disabled={numBatteries === 0}
                onClick={removeBattery}
              >
                <MinusIcon className="w-6 h-6" />
              </Button>
              <p className="text-3xl font-semibold">{numBatteries}</p>
              <Button
                type="button"
                className="bg-green-600"
                size="sm"
                onClick={addBattery}
                disabled={numBatteries >= maxBatteries}
              >
                <PlusIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">
              {selectedBattery.name} - {selectedBattery.capacity} kW <br />@
              {formatCurrency(selectedBattery.price)} each
            </p>
            <Separator className="my-2" />
            <h3 className="text-lg font-medium">
              {formatCurrency(selectedBattery.price * numBatteries)} -{" "}
              {(numBatteries * selectedBattery.capacity).toFixed(0)} kWh{" "}
              <span className="text-xs">(in total battery storage)</span>
            </h3>
            <div>
              <Label className="text-2xl">Inverter</Label>
              <h3 className="text-sm font-medium">
                {selectedInverter.name} - {selectedInverter.phase}
              </h3>
              <Separator className="my-2" />
              <h3 className="text-lg font-medium">
                {formatCurrency(selectedInverter.price)}
              </h3>
            </div>
          </div>
        </div>
      </div>{" "}
      <Separator className="my-3" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Map
          lat={center.latitude}
          lng={center.longitude}
          roofSegments={roofSegments}
          selectedSegmentIndex={selectedSegmentIndex}
        />
        <div className="w-full">
          <h3 className="text-lg font-bold">
            This configuration would provide a total of{" "}
            <span className="text-rose-700">
              {(
                (configs[selectedConfigIndex].yearlyEnergyDcKwh / 365) *
                solarOutputRatio
              ).toFixed(2)}{" "}
              kWh/day
            </span>
          </h3>
          <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold ">
              Selected Configuration Summary
            </h2>
            <p>
              Configuration will cover{" "}
              {configs[selectedConfigIndex].roofSegmentSummaries.length}{" "}
              segments
            </p>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {configs[selectedConfigIndex].roofSegmentSummaries.map(
                (item, index) => (
                  <div
                    key={index}
                    className="w-full p-4 text-lg font-semibold rounded-lg text-sky-50 bg-sky-700"
                  >
                    <h3 className="">
                      Output{" "}
                      {(
                        (item.yearlyEnergyDcKwh / 365) *
                        solarOutputRatio
                      ).toFixed(2)}{" "}
                      kWh/day
                    </h3>{" "}
                    <p className="flex items-center space-x-2 text-sm font-semibold">
                      Roof Segment Direction:{" "}
                      {getDirection(item.azimuthDegrees)}
                      <CompassIcon className="w-6 h-6 ml-2" />
                    </p>{" "}
                    <p className="flex items-center space-x-2 text-sm font-medium">
                      Solar Panels Array Area:{" "}
                      {(item.panelsCount * (panelHeight * panelWidth)).toFixed(
                        2
                      )}{" "}
                      m<sup>2</sup>
                      <Grid3X3 className="w-6 h-6 ml-2" />
                    </p>
                    <p className="flex items-center space-x-2 text-sm font-medium">
                      Roof Segment Area:{" "}
                      {roofSegments[
                        item.segmentIndex
                      ].stats.areaMeters2.toFixed(2)}{" "}
                      m<sup>2</sup>
                      <HomeIcon className="w-6 h-6 ml-2" />
                    </p>
                    <p className="flex items-center space-x-2 text-sm font-medium">
                      Roof Segment Pitch: {item.pitchDegrees.toFixed(2)}{" "}
                      <sup>o</sup>
                      <TriangleIcon className="w-6 h-6 ml-2" />
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-3" />
    </div>
  );
};
export default RoofSegments;
