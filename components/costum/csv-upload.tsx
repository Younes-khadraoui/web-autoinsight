"use client";

import { UploadCloud, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { useReportStore } from "@/store/report";

export default function CSVUpload() {
  const { uploadedFile, setUploadedFile } = useReportStore();
  useEffect(() => {
    setUploadedFile(uploadedFile);
  }, [uploadedFile]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const csvFile = acceptedFiles.find(
      (file) => file.type === "text/csv" || file.name.endsWith(".csv")
    );
    if (csvFile) {
      setUploadedFile(csvFile);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
        >
          <div className=" text-center">
            <div className="p-2 max-w-min mx-auto">
              <UploadCloud size={20} color="black" />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag file</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload a CSV file &#40;file should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept=".csv,text/csv"
          type="file"
          className="hidden"
        />
      </div>
      {uploadedFile && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded File
          </p>
          <div className="space-y-2 pr-3">
            <div className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all">
              <div className="flex items-center flex-1 p-2">
                <div className="text-white"></div>
                <div className="w-full ml-2 space-y-1">
                  <div className="text-sm flex justify-between">
                    <p className="text-muted-foreground ">
                      {uploadedFile.name}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
