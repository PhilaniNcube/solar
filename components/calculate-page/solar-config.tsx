import { SolarConfig } from "@/interfaces";
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const SolarConfiguration = ({ solarConfig }: { solarConfig: SolarConfig[] }) => {
  return (
    <ScrollArea className="w-full my-3 flex lg:max-w-5xl sm:max-w-4xl max-w-sm mx-auto gap-4 h-64 max-h-[300px]">
      <Select>
        <SelectTrigger className="min-w-[180px] max-w-[200px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {solarConfig.map((option, index) => (
              <SelectItem value={`${index}`}>{option.panelsCount} Solar Panels</SelectItem>
            ))}

          </SelectGroup>
        </SelectContent>
      </Select>
    </ScrollArea>
  );
};
export default SolarConfiguration;
