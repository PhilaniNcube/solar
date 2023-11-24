"use client"

import { DataResponse, RoofSegment, SolarConfig } from "@/interfaces";
import getDirection from "@/lib/direction";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import SolarConfiguration from "./solar-config";

const RoofSections = ({
  segments,
  solarConfig,
}: {
  segments: RoofSegment[];
  solarConfig: SolarConfig[];
}) => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);

  return (
    <section className="w-full pb-12">
      <div className="container space-y-4 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Roof Properties for Solar Power Systems
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              Your roof has been broken down into {segments.length} segments.
            </p>
          </div>
        </div>
        <div className="w-full my-3 flex lg:max-w-5xl sm:max-w-4xl max-w-sm mx-auto gap-4">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-center">
              <Button
                type="button"
                onClick={() => setSelectedSegmentIndex(index)}
                className={cn(
                  `flex items-center justify-center`,
                  index === selectedSegmentIndex
                    ? "bg-zinc-500 text-white"
                    : "bg-white text-zinc-500"
                )}
              >
                Roof Section {index + 1}
              </Button>
            </div>
          ))}
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1 bg-white shadow-lg rounded-lg p-4">
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
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
            <h3 className="text-lg font-bold">Roof Pitch</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The pitch of the roof segment, which affects the efficiency of
              solar power generation.
            </p>
            <div className="text-2xl font-bold">
              {segments[selectedSegmentIndex].pitchDegrees.toFixed(0)}°
            </div>
          </div>
          <div className="grid gap-1 bg-white shadow-lg rounded-lg p-4">
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
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <h3 className="text-lg font-bold">Roof Direction</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The direction the roof segment is facing. Optimal solar power
              generation occurs on south-facing roofs.
            </p>
            <div className="text-2xl font-bold">
              {getDirection(segments[selectedSegmentIndex].azimuthDegrees)}
            </div>
          </div>
          <div className="grid gap-1 bg-white shadow-lg rounded-lg p-4">
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
              <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
              <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
              <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
              <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
            </svg>
            <h3 className="text-lg font-bold">Segment Area</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The total area of this roof segment that can be used for solar
              panels.
            </p>
            <div className="text-2xl font-bold">
              {segments[selectedSegmentIndex].stats.areaMeters2.toFixed(0)} sq
              mt
            </div>
          </div>
        </div>
      </div>
      {/* <SolarConfiguration solarConfig={solarConfig} /> */}
    </section>
  );
};
export default RoofSections;
