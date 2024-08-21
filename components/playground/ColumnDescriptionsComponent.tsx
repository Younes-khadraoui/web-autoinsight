import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ColumnDescriptionsProps {
  columns: string[];
  columnDescriptions: { [key: string]: string };
  setColumnDescriptions: (descriptions: { [key: string]: string }) => void;
}

const ColumnDescriptionsComponent: React.FC<ColumnDescriptionsProps> = ({
  columns,
  columnDescriptions,
  setColumnDescriptions,
}) => {
  return (
    <div>
      <label className="text-white font-bold">Describe the columns</label>
      {columns.map((column) => (
        <div key={column} className="mt-2">
          <label className="text-white">{column} :</label>
          <Textarea
            className="w-[200px] mt-1"
            placeholder={`Description for ${column}`}
            name={`description-${column}`}
            value={columnDescriptions[column]}
            onChange={(e) =>
              setColumnDescriptions({
                ...columnDescriptions,
                [column]: e.target.value,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ColumnDescriptionsComponent;
