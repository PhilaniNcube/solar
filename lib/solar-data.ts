// write a function to fetch solar data from the Google Solar API

import { DataResponse, DatalayerError } from "@/interfaces"
import { redirect } from "next/navigation";

async function getSolarData(lat:number, lng:number) {

     const url = new URL(
     `https://solar.googleapis.com/v1/buildingInsights:findClosest?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
   );

    url.searchParams.append("location.latitude", lat.toString());
    url.searchParams.append("location.longitude", lng.toString());

    try {
      const response = await fetch(url.toString());
      const data = await response.json();

      if(data?.error) {
        throw new Error(data.error.message);
      }


      return data as DataResponse




    } catch (error) {
       redirect('/error')
    }

}


export default getSolarData;
