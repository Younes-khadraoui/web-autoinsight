import Papa from "papaparse";

export const handleFileChange = (
  file: File
): Promise<{
  columnHeaders: string[];
  initialDescriptions: { [key: string]: string };
}> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        const columnHeaders = results.meta.fields || [];
        const initialDescriptions = columnHeaders.reduce(
          (acc: any, column: any) => {
            acc[column] = "";
            return acc;
          },
          {} as { [key: string]: string }
        );
        resolve({ columnHeaders, initialDescriptions });
      },
      error: (error: any) => {
        reject(error);
      },
    });
  });
};
