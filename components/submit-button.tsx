"use client"

import { ReactNode } from "react";
// @ts-ignore
import { useFormStatus  } from "react-dom";
import { Button } from "./ui/button";
import { CircleDashed } from "lucide-react";

const SubmitButton = ({children}:{children:ReactNode}) => {

  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full text-lg flex items-center justify-center font-medium">
      {children}
      {pending && (
        <span className="ml-2">
          <CircleDashed className="h-4 w-4 animate-spin " />
        </span>
      )}
    </Button>
  );
};
export default SubmitButton;
