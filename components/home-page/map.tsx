"use client"
import { FormEvent, useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// @ts-ignore
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useSearchParams } from "next/navigation";
import { CircleDashedIcon } from "lucide-react";


const Map = () => {

  const searchParams = useSearchParams()

  const lat = searchParams.get("lat") || 40.7484405;
  const lng = searchParams.get("lng") || -73.9878531;

  console.log(lat, lng)

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    });


    const [coords, setCoords] = useState({lat: 0, lng: 0})

    useEffect(() => {

      setCoords({ lat: 40.7484405, lng: -73.9878531 })

    },[])

      if (!isLoaded) {
        return <div className="flex justify-center items-center">
            <CircleDashedIcon size={24} className="animate-spin text-4xl" />
        </div>;
      } else if(isLoaded) {
return (
  <GoogleMap
    mapTypeId="satellite"
    zoom={22}
    mapContainerClassName="w-full h-[600px] aspect-square"
    center={{
      lat: Number(lat),
      lng: Number(lng),
    }}
  >
    <Marker
      position={{
        lat: Number(lat),
        lng: Number(lng),
      }}

    />
  </GoogleMap>
);
      } else {
        return <div>error</div>
      }


};
export default Map;

