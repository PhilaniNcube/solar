import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Hero from "./_components/Hero";
import { redirect } from "next/navigation";

const page = async ({params:{id}}:{params:{id:string}}) => {
 const cookieStore = cookies();
 const supabase = createClient(cookieStore);

 const {data, error} = await supabase.from("geocoding").select("*, lead_id!inner(*)").eq("id", id).single();

 console.log({data, error})

 if(error) {
 redirect(`/error`);
 }

  return <main className="py-10 container">
    <Hero address={data!} />
  </main>;
};
export default page;
