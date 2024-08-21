// pages/Playground.tsx
"use client";

import { Operations } from "@/components/playground/Operations";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useReportStore } from "@/store/report";
import FileUploadComponent from "@/components/playground/FileUploadComponent";
import DataDescriptionComponent from "@/components/playground/DataDescriptionComponent";
import ColumnDescriptionsComponent from "@/components/playground/ColumnDescriptionsComponent";
import PromptComponent from "@/components/playground/PromptComponent";
import ReportComponent from "@/components/playground/ReportComponent";
import { handleFileChange } from "@/utils/fileUtils";

const Playground = () => {
  const state = useReportStore();
  const [conclusion, setConclusion] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [dataDescription, setDataDescription] = useState<string>("");
  const [columnDescriptions, setColumnDescriptions] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<string[]>([]);

  const handleFileUpload = (file: File) => {
    handleFileChange(file).then(({ columnHeaders, initialDescriptions }) => {
      setColumns(columnHeaders);
      setColumnDescriptions(initialDescriptions);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("operation", state.operation);
      if (state.uploadedFile) {
        formData.append("uploadedFile", state.uploadedFile);
      }
      formData.append("prompt", prompt);
      formData.append("dataDescription", dataDescription);
      formData.append("columnDescriptions", JSON.stringify(columnDescriptions));

      const response = await axios.post(
        "http://localhost:8000/generate-conclusion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setConclusion(response.data.conclusion);
      setResponse(response.data.response);
    } catch (error) {
      console.error("Error generating conclusion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-16 pt-40 flex gap-20">
      <div>
        <h2 className="font-bold text-2xl pb-4">Upload CSV File</h2>
        <form
          className="text-black flex flex-col gap-10"
          onSubmit={handleSubmit}
        >
          <FileUploadComponent
            onFileUpload={handleFileUpload}
            uploadedFile={state.uploadedFile}
          />
          {state.uploadedFile && (
            <>
              <DataDescriptionComponent
                dataDescription={dataDescription}
                setDataDescription={setDataDescription}
              />
              <ColumnDescriptionsComponent
                columns={columns}
                columnDescriptions={columnDescriptions}
                setColumnDescriptions={setColumnDescriptions}
              />
            </>
          )}
          <Operations />
          <PromptComponent prompt={prompt} setPrompt={setPrompt} />
          <Button className="bg-red-500 w-[200px]" type="submit">
            Generate Conclusion
          </Button>
        </form>
      </div>
      <ReportComponent
        loading={loading}
        response={response}
        conclusion={conclusion}
      />
    </div>
  );
};

export default Playground;
