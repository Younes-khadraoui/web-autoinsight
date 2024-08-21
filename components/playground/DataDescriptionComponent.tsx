// components/DataDescriptionComponent.tsx
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface DataDescriptionProps {
  dataDescription: string;
  setDataDescription: (description: string) => void;
}

const DataDescriptionComponent: React.FC<DataDescriptionProps> = ({
  dataDescription,
  setDataDescription,
}) => {
  return (
    <div>
      <label className="text-white font-bold">Describe the data</label>
      <Textarea
        className="w-[200px] mt-2"
        placeholder="Describe the data"
        name="data-description"
        value={dataDescription}
        onChange={(e) => setDataDescription(e.target.value)}
      />
    </div>
  );
};

export default DataDescriptionComponent;
