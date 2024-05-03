import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CSVUpload from "@/components/costum/csv-upload";
import { Button } from "@/components/ui/button";

const FileUpload = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-sm shadow" variant="outline">
          File upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-black">
            Upload your Dataset
          </DialogTitle>
          <DialogDescription className="text-center">
            The only file upload you will ever need
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CSVUpload />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;
