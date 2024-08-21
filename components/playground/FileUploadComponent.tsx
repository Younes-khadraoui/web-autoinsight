// components/FileUploadComponent.tsx
import React from "react";
import FileUpload from "@/components/playground/File-upload";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({
  onFileUpload,
  uploadedFile,
}) => {
  return (
    <div className="flex flex-col gap-2 w-[200px]">
      <FileUpload onFileUpload={onFileUpload} />
      {uploadedFile && <p className="text-white">{uploadedFile.name}</p>}
    </div>
  );
};

export default FileUploadComponent;
