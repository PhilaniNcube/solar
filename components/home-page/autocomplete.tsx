"use client"

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// const libraries = "places";


const Autocomplete = () => {

  const [open, setOpen] = useState(false)

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const [selected, setSelected] = useState<null | string>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const {ready, value, setValue, suggestions:{status, data}} = usePlacesAutocomplete()

  console.log({ready, value, setValue, suggestions:{status, data}})

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}
      />
    </div>
  );
};
export default Autocomplete;
