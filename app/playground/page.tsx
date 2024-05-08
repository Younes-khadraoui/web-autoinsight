"use client";

import { Operations } from "@/components/costum/Operations";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import FileUpload from "@/components/costum/File-upload";
import { Input } from "@/components/ui/input";
import { useReportStore } from "@/store/report";
import ReactMarkdown from "react-markdown";

const Playground = () => {
  const state = useReportStore();
  const [conclusion, setConclusion] = React.useState<string | null>(null);
  const [response, setResponse] = React.useState<string | null>(null);
  const [prompt, setPrompt] = React.useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("operation", state.operation);
      if (state.uploadedFile) {
        formData.append("uploadedFile", state.uploadedFile);
      }
      formData.append("prompt", prompt);

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
            <FileUpload />
            {state.uploadedFile && (
              <p className="text-white">{state.uploadedFile.name}</p>
            )}
          </div>
          <Operations />
          <Input
            className="w-[200px]"
            placeholder="Change the prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button className="bg-red-500" type="submit">
            Generate Conclusion
          </Button>
        </form>
      </div>
      <div className="bg-second p-5 min-h-screen flex-1">
        <p className="font-bold text-3xl pb-6">The report</p>
        <p className="text-xl"></p>
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
      </div>
    </div>
  );
};

export default Playground;
