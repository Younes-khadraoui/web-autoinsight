import { Operations } from "@/components/costum/Operations";
import Prompt from "@/components/costum/Prompt";
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
import axios from "axios";

const Playground = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    axios.post("/generate-conclusion", {});
  };

  return (
    <div className="min-h-screen p-16 pt-40 flex gap-20">
      <div>
        <h2 className="font-bold text-2xl pb-4">Upload CSV File</h2>
        <form className="text-black flex flex-col gap-10" action={handleSubmit}>
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
          <Prompt />
          <Button className="bg-red-500" type="submit">
            Generate Conclusion
          </Button>
        </form>
      </div>
      <div className="bg-second p-5 min-h-screen flex-1">
        <p className="font-bold text-3xl pb-6">The report</p>
        <p className="text-xl">
          The distribution of prices across different neighbourhoods is likely
          to vary. Affluent or popular tourist neighbourhoods would likely have
          higher average prices compared to less popular or residential
          neighbourhoods . The dataset does not provide information on
          neighbourhoods, but this would be an interesting aspect to explore in
          further analyses. Also, the type of room could have different
          distributions depending on the neighbourhood. For example, entire
          homes or apartments might be more common in residential areas, while
          private rooms or shared rooms might be more prevalent in city centres
          or areas with a high student population. Finally, the minimum nights
          requirement might also vary by neighbourhood. Areas popular with
          tourists might have shorter minimum stay requirements to cater to
          short-term visitors, while residential areas might require longer
          stays. In conclusion, to provide a comprehensive insight into the
          relationship between neighbourhood and Airbnb prices, it would be
          beneficial to consider the type of room and minimum night
          requirements, in addition to the average price. A detailed study would
          require a more in-depth analysis of the provided dataset and possibly
          additional data on the characteristics of the different
          neighbourhoods.
        </p>
        {/* {conclusion && (
          <div className="mt-4">
            <p>{conclusion}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Playground;
