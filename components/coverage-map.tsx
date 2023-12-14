"use client";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { high, medium } from "@/geodata";




const CoverageMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // console.log(medium)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      const {poly} = await loader.importLibrary("geometry");




      // set up a marker
      const { Marker } = await loader.importLibrary("marker");

      const position = {
        lat: lat,
        lng: lng,
      };

      const mapOptions: google.maps.MapOptions = {
        center: {
          lat: lat,
          lng: lng,
        },
        zoom: 1,
        mapId: google.maps.MapTypeId.ROADMAP,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,

      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);



      const marker = new Marker({
        position: position,
        map: map,
      });

               const polygons = map.data.addGeoJson(high.geometries[0]);
               const polygons2 = map.data.loadGeoJson(`${medium}`);

               console.log({ polygons, polygons2 });
    };



    initMap();
  }, []);

  return <div ref={mapRef} className="w-full aspect-[8/3]">

  </div>;
};
export default CoverageMap;
