import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Hero from "./_components/Hero";
import { redirect } from "next/navigation";
import SolarData from "./_components/solar-data";

const page = async ({params:{id}}:{params:{id:string}}) => {
 const cookieStore = cookies();
 const supabase = createClient(cookieStore);

 const {data, error} = await supabase.from("geocoding").select("*, lead_id!inner(*)").eq("id", id).single();



 if(error) {
 redirect(`/error`);
 }

  return (
    <main className="py-10 container">
      <Hero address={data!} />
      <SolarData
        lat={data.results[0].geometry.location.lat}
        lng={data.results[0].geometry.location.lng}
      />
    </main>
  );
};
export default page;
