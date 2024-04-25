"use client";
import React from "react";
import { useState } from "react";

interface card {
  question: string;
  answer: string;
}

const cards: card[] = [
  {
    question: "What is Autoinsight",
    answer:
      "Autoinsight is a package designed to expedite the process of building analyses, machine learning models, and reports for data scientists and analysts. By leveraging the power of Large Language Models (LLMs)",
  },
  {
    question: "What is Meow",
    answer: "meow meow",
  },
  {
    question: "What is Dog",
    answer: "woof woof",
  },
];

const Questions = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="p-10 pb-20 lg:p-56 lg:pt-10">
      <p className="font-bold text-5xl pb-10 text-center">
        Frequently asked <br />
        Questions ?
      </p>
      <div className="flex gap-10 lg:px-36">
        <div className="flex justify-center items-center">
          <button
            className="p-6 px-8 border-4 rounded-[50%] font-bold text-2xl"
            onClick={() => {
              if (index === 0) setIndex(cards.length - 1);
              else setIndex(index - 1);
            }}
          >
            &lt;
          </button>
        </div>
        <div className="p-10 pb-20 border-4 bg-second rounded-3xl flex-1">
          <p className="font-semibold text-xl pb-2">{cards[index].question}</p>
          <p className="text-lg">{cards[index].answer}</p>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="p-6 px-8 border-4 rounded-[50%] font-bold text-2xl"
            onClick={() => {
              if (index === cards.length - 1) setIndex(0);
              else setIndex(index + 1);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
