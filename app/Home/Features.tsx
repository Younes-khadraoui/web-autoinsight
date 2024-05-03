import React from "react";

const Features = () => {
  return (
    <div className="min-h-screen p-10 lg:p-56 lg:pt-10">
      <p className="font-bold text-5xl pb-10">Features</p>
      <div className="grid grid-cols-2 gap-10">
        <div className="p-10 pb-20 bg-second rounded-3xl">
          <p className="font-semibold text-xl pb-2">Maximum Efficiency:</p>
          <p className="text-lg">
            Automate tedious tasks and save time for more strategic analyzes
            thanks to our intelligent system.
          </p>
        </div>
        <div className="p-10 pb-20 -mt-24 mb-24 bg-second rounded-3xl">
          <p className="font-semibold text-xl pb-2">
            Contextual Interpretation:
          </p>
          <p className="text-lg">
            Integrated LLMs allow you to analyze data with contextual
            understanding, providing deeper and more precise insights.Automate
            tedious tasks and save time for more strategic analyzes thanks to
            our intelligent system.
          </p>
        </div>
        <div className="p-10 pb-20 bg-second rounded-3xl">
          <p className="font-semibold text-xl pb-2">Advanced Customization:</p>
          <p className="text-lg">
            Adapt our system to your specific needs by changing the prompt
            according to your requirements, ensuring a tailor-made data analysis
            experience.
          </p>
        </div>
        <div className="p-10 pb-20 -mt-24 mb-24 bg-second rounded-3xl">
          <p className="font-semibold text-xl pb-2">
            Generation of Relevant Reports:
          </p>
          <p className="text-lg">
            Obtain reports that meaningfully summarize the data provided
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
