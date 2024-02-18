"use client"

import { ReactNode } from "react";
// @ts-ignore
import { useFormStatus  } from "react-dom";
import { Button } from "./ui/button";
import { CircleDashed } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";

const SubmitButton = ({children}:{children:ReactNode}) => {

  const { pending } = useFormStatus();

  return (
			<Button
				onClick={() => sendGTMEvent({ event: "generate_lead" })}
				type="submit"
				className="flex items-center justify-center w-full text-lg font-medium"
			>
				{children}
				{pending && (
					<span className="ml-2">
						<CircleDashed className="w-4 h-4 animate-spin " />
					</span>
				)}
			</Button>
		);
};
export default SubmitButton;
