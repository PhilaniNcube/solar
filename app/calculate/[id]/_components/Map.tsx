"use client"
import {useEffect, useRef} from "react";
import {Loader} from "@googlemaps/js-api-loader";

const Map = ({lat, lng}:{lat:number, lng:number}) => {

  const mapRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const initMap = async() => {

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places"],
      });

      const{Map} = await loader.importLibrary("maps");

      // set up a marker
      const {Marker} = await loader.importLibrary("marker");


      const position = {
        lat: lat,
        lng: lng,
      }

        const mapOptions: google.maps.MapOptions = {
          center: {
            lat: lat,
            lng: lng,
          },

          zoom: 20,
          mapId: google.maps.MapTypeId.SATELLITE,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
        };

        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        const marker = new Marker({
          position: position,
          map: map,
        });

    }

    initMap();
  }, []);

  return <div ref={mapRef} className="w-full aspect-video"></div>;
};
export default Map;
