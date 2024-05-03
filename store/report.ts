import { create } from "zustand";

type ReportStore = {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  operation: string;
  setOperation: (operation: string) => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  operation: "",
  setOperation: (operation) => set({ operation }),
}));
