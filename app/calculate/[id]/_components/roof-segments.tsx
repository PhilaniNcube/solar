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
import { AreaChartIcon, CheckCheckIcon, CompassIcon, Grid3X3, HomeIcon, TriangleIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Database } from "@/interfaces/supabase";
import { Label } from "@/components/ui/label";

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
  panelWidth,
  panelHeight,
  solarCapacity,
  roofSegments,
  solarPanels,
  configs,
}: {
  roofSegments: RoofSegment[];
  solarPanels: SolarPanels;
  configs: Configs;
  solarCapacity: number;
  panelWidth: number;
  panelHeight: number;
}) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<number>(0);

  const [selectedConfigIndex, setSelectedConfigIndex] = useState<number>(0);
  const [selectedPanelsIndex, setSelectedPanelsIndex] = useState<number>(0);

  const solarOutputRatio =
    solarPanels !== null
      ? solarPanels[selectedPanelsIndex].output / solarCapacity
      : 1;

      // console.log({panelWidth, panelHeight})

  return (
    <div className="w-full mt-2">
      {/* <h2>{getDirection(roofSegments[selectedSegmentIndex].azimuthDegrees)}</h2> */}
      {/* <div className="grid grid-cols-2 gap-4">
        {roofSegments.map((segment, index) => (
          <div
            onClick={() => setSelectedSegmentIndex(index)}
            key={index}
            className="w-full relative rounded-lg p-4 cursor-pointer hover:shadow-xl bg-white overflow-hidden border border-slate-200"
          >
            {selectedSegmentIndex === index && (
              <CheckCheckIcon className="absolute top-2 right-2 h-6 w-6 bg-blue-400 rounded-full p-1 text-white" />
            )}

            <h3 className="text-lg font-semibold flex items-center space-x-2">
              Roof Segment Direction: {getDirection(segment.azimuthDegrees)}
              <CompassIcon className="ml-2 h-6 w-6" />
            </h3>
            <p className="text-lg font-medium flex items-center space-x-2">
              Area: {segment.stats.areaMeters2.toFixed(2)} m<sup>2</sup>
              <AreaChartIcon className="ml-2 h-6 w-6" />
            </p>

            <p className="text-lg font-medium flex items-center space-x-2">
              Pitch: {segment.pitchDegrees.toFixed(2)}°
              <TriangleIcon className="ml-2 h-6 w-6" />
            </p>
          </div>
        ))}
      </div> */}
      <Separator className="my-3" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    {(panelHeight * panelWidth * config.panelsCount).toFixed(2)}{" "}
                    m<sup>2</sup>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
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
      </div>{" "}
      <Separator className="my-3" />
      <h3 className="text-lg md:text-3xl font-bold my-6">
        This configuration would provide a total of{" "}
        {(
          (configs[selectedConfigIndex].yearlyEnergyDcKwh / 365) *
          solarOutputRatio
        ).toFixed(2)}{" "}
        kWh/day
      </h3>
      <Separator className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {configs[selectedConfigIndex].roofSegmentSummaries.map(
          (item, index) => (
            <div key={index} className="w-full rounded-lg bg-white p-4">
              <h3 className="text-2xl my-2 font-semibold">
                Output{" "}
                {((item.yearlyEnergyDcKwh / 365) * solarOutputRatio).toFixed(2)}{" "}
                kWh/day
              </h3>{" "}
              <p className="text-lg font-semibold flex items-center space-x-2">
                Roof Segment Direction: {getDirection(item.azimuthDegrees)}
                <CompassIcon className="ml-2 h-6 w-6" />
              </p>{" "}
              <p className="text-lg font-medium flex items-center space-x-2">
                Solar Panels Array Area:{" "}
                {(item.panelsCount * (panelHeight * panelWidth)).toFixed(2)} m
                <sup>2</sup>
                <Grid3X3 className="ml-2 h-6 w-6" />
              </p>
              <p className="text-lg font-medium flex items-center space-x-2">
                Roof Segment Area:{" "}
                {roofSegments[item.segmentIndex].stats.areaMeters2.toFixed(2)} m
                <sup>2</sup>
                <HomeIcon className="ml-2 h-6 w-6" />
              </p>
              <p className="text-lg font-medium flex items-center space-x-2">
                Roof Segment Pitch: {item.pitchDegrees.toFixed(2)} <sup>o</sup>
                <TriangleIcon className="ml-2 h-6 w-6" />
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default RoofSegments;
