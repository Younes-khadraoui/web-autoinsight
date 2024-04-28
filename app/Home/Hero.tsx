import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-12">
      <p className="text-6xl font-bold text-center lg:text-7xl">
        The Python package for <br className="lg:hidden" /> Data analysts
      </p>
      <p className="text-center text-third lg:text-xl">
        Autoinsight is a package that help data scientists and data analysts
        building <br /> analysis, machine learning models and reports faster and
        easier, using LLMs.
      </p>
      <div className="flex gap-10 font-medium">
        <button className="bg-white px-16 py-4 text-black rounded-full border-2 border-white">
          <Link href="/docs/getting-started">Get Started</Link>
        </button>
        <button className="px-16 py-4 rounded-full border-2 border-white">
          <Link href="/playground">Playground</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
