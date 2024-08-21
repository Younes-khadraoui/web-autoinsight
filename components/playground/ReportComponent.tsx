import React from "react";
import ReactMarkdown from "react-markdown";
import { PacmanLoader } from "react-spinners";

interface ReportProps {
  loading: boolean;
  response: string | null;
  conclusion: string | null;
}

const ReportComponent: React.FC<ReportProps> = ({ loading, response, conclusion }) => {
  return (
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
  );
};

export default ReportComponent;
