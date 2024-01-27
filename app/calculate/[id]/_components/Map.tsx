"use client"
import {useEffect, useRef} from "react";
import {Loader,} from "@googlemaps/js-api-loader";
import { DataResponse, RoofSegment } from "@/interfaces";
import { Polygon } from "@react-google-maps/api";


const Map = ({
  lat,
  lng,
  roofSegments,
  selectedSegmentIndex,
}: {
  lat: number;
  lng: number;
  roofSegments: RoofSegment[];
  selectedSegmentIndex: number;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places", "geometry", "visualization", "core"],
      });

      const { Map } = await loader.importLibrary("maps");

      // set up a marker
      const { Marker } = await loader.importLibrary("marker");

      const { DrawingManager } = await loader.importLibrary("drawing");

      const position = {
        lat: lat,
        lng: lng,
      };

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

      // const markers = roofSegments.map((segment) => {
      //   return new Marker({
      //     position: {
      //       lat: segment.center.latitude,
      //       lng: segment.center.longitude,
      //     },
      //     map: map,
      //   });
      // });

      // const marker = new Marker({
      //   position: position,
      //   map: map,
      // });

      const marker = new Marker({
        position: {
          lat: roofSegments[selectedSegmentIndex].center.latitude,
          lng: roofSegments[selectedSegmentIndex].center.longitude,
        },
        map: map,
      });

      const bounds = new google.maps.LatLngBounds({ lat: lat, lng: lng });

      const drawingManager = new DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        markerOptions: {
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });

      drawingManager.setMap(map);
    };

    initMap();
  }, [selectedSegmentIndex]);

  return <div ref={mapRef} className="w-full aspect-video"></div>;
};
export default Map;
