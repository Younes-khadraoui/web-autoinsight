import { Operations } from "@/components/Operations";
import ImageUpload from "@/components/costum/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const playground = () => {
  return (
    <div className="min-h-screen p-16 pt-40 flex gap-20">
      <div>
        <h2 className="font-bold text-2xl pb-4">Upload CSV File</h2>
        <div className="text-black flex flex-col gap-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-sm shadow" variant="outline">
                File upload
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Upload your files
                </DialogTitle>
                <DialogDescription className="text-center">
                  The only file upload you will ever need
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ImageUpload />
              </div>
            </DialogContent>
          </Dialog>
          <Operations />
        </div>
      </div>
      <div className="bg-second p-5 min-h-screen flex-1">
        <p className="font-bold text-2xl">The report</p>
      </div>
    </div>
  );
};

export default playground;
