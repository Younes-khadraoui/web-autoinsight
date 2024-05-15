"use client";

import { Operations } from "@/components/costum/Operations";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import FileUpload from "@/components/costum/File-upload";
import { Input } from "@/components/ui/input";
import { useReportStore } from "@/store/report";
import ReactMarkdown from "react-markdown";
import { PacmanLoader } from "react-spinners";
import { Textarea } from "@/components/ui/textarea";
import Papa from "papaparse";

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

  const handleFileChange = (file: File) => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: any) => {
          const columnHeaders = results.meta.fields || [];
          setColumns(columnHeaders);
          const initialDescriptions = columnHeaders.reduce(
            (acc: any, column: any) => {
              acc[column] = "";
              return acc;
            },
            {} as { [key: string]: string }
          );
          setColumnDescriptions(initialDescriptions);
        },
      });
    }
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
      console.log("columnDescriptions", JSON.stringify(columnDescriptions));
      console.log("operation", state.operation);

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
          <div className="flex flex-col gap-2 w-[200px]">
            <FileUpload onFileUpload={handleFileChange} />
            {state.uploadedFile && (
              <p className="text-white">{state.uploadedFile.name}</p>
            )}
          </div>
          {state.uploadedFile && (
            <>
              <div>
                <label className="text-white font-bold">
                  Describe the data
                </label>
                <Textarea
                  className="w-[200px] mt-2"
                  placeholder="Describe the data"
                  name="data-description"
                  value={dataDescription}
                  onChange={(e) => setDataDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-white font-bold">
                  Describe the columns
                </label>
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
            </>
          )}
          <Operations />
          <div>
            <label className="text-white font-bold">Prompt (optional)</label>
            <Input
              className="w-[200px] mt-2"
              placeholder="Change the prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <Button className="bg-red-500 w-[200px]" type="submit">
            Generate Conclusion
          </Button>
        </form>
      </div>
      <div className="bg-second p-5 min-h-screen flex-1">
        <p className="font-bold text-3xl pb-6">The report</p>
        <p className="text-xl"></p>
        {loading ? (
          <PacmanLoader color="white" />
        ) : (
          <React.Fragment>
            {response && (
              <div className="mt-4">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            )}
            {conclusion && (
              <div className="mt-4">
                <ReactMarkdown>{conclusion}</ReactMarkdown>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Playground;
